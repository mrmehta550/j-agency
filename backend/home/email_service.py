"""
Enterprise Email Service for Magency Studio (Render & Production Compatible)
=============================================================================
Supports:
1. Resend API over HTTPS (Port 443) - Recommended for Render (never blocked).
2. Django SMTP (Port 587 / 465) - Fallback for local development or environments where outbound SMTP is allowed.
3. Clean error logging with Submission ID tracking without leaking secrets.
"""

import json
import logging
import socket
import urllib.error
import urllib.request
from typing import Any, Dict, List, Optional, Tuple

from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

logger = logging.getLogger(__name__)


def _mask_secret(val: str) -> str:
    """Mask sensitive string like api key or password for logs."""
    if not val:
        return "<not set>"
    if len(val) <= 6:
        return "***"
    return f"{val[:3]}...{val[-3:]}"


def is_resend_configured() -> bool:
    """Check if Resend API key is present in environment/settings."""
    key = getattr(settings, "RESEND_API_KEY", "") or ""
    return bool(key.strip())


def is_smtp_configured() -> bool:
    """Check if SMTP credentials are configured."""
    user = getattr(settings, "EMAIL_HOST_USER", "") or ""
    pwd = getattr(settings, "EMAIL_HOST_PASSWORD", "") or ""
    return bool(user.strip() and pwd.strip())


def send_via_resend(
    subject: str,
    message: str,
    recipient: str,
    from_email: Optional[str] = None,
    reply_to: Optional[str] = None,
    html_message: Optional[str] = None,
    context_label: Optional[str] = None,
) -> Tuple[bool, str]:
    """
    Send email via Resend REST API over HTTPS (Port 443).
    Guaranteed to bypass cloud provider outbound SMTP blocks on Render.
    """
    api_key = getattr(settings, "RESEND_API_KEY", "").strip()
    if not api_key:
        return False, "RESEND_API_KEY is not configured."

    sender = from_email or getattr(settings, "RESEND_FROM_EMAIL", "Magency Studio <notifications@magencystudio.in>").strip()
    endpoint = "https://api.resend.com/emails"

    payload: Dict[str, Any] = {
        "from": sender,
        "to": [recipient],
        "subject": subject,
        "text": message,
    }

    if reply_to:
        payload["reply_to"] = reply_to
    if html_message:
        payload["html"] = html_message

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": "MagencyStudio-EmailDelivery/1.0",
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(endpoint, data=data, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp_body = resp.read().decode("utf-8")
            status_code = resp.status
            try:
                resp_json = json.loads(resp_body)
                email_id = resp_json.get("id", "ok")
            except Exception:
                email_id = "ok"

            logger.info(
                "[EMAIL_DISPATCH_SUCCESS] [%s] Engine: Resend API | To: %s | Status: %s | MessageID: %s",
                context_label or "N/A",
                recipient,
                status_code,
                email_id,
            )
            return True, f"Resend ID: {email_id}"

    except urllib.error.HTTPError as err:
        err_body = err.read().decode("utf-8", errors="replace")
        logger.error(
            "[EMAIL_DISPATCH_FAILED] [%s] Engine: Resend API | To: %s | HTTP %s: %s",
            context_label or "N/A",
            recipient,
            err.code,
            err_body,
        )
        return False, f"Resend HTTP {err.code}: {err_body}"

    except urllib.error.URLError as err:
        logger.error(
            "[EMAIL_DISPATCH_FAILED] [%s] Engine: Resend API | To: %s | Network Error: %s",
            context_label or "N/A",
            recipient,
            err.reason,
        )
        return False, f"Resend Network Error: {err.reason}"

    except Exception as exc:
        logger.error(
            "[EMAIL_DISPATCH_FAILED] [%s] Engine: Resend API | To: %s | Unexpected: %s",
            context_label or "N/A",
            recipient,
            exc,
            exc_info=True,
        )
        return False, f"Resend Unexpected Error: {str(exc)}"


def send_via_smtp(
    subject: str,
    message: str,
    recipient: str,
    from_email: Optional[str] = None,
    html_message: Optional[str] = None,
    context_label: Optional[str] = None,
) -> Tuple[bool, str]:
    """
    Send email via Django SMTP backend (smtp.gmail.com:587 / 465).
    Catches exact network, auth, and timeout errors with clean diagnostics.
    """
    sender = from_email or getattr(settings, "DEFAULT_FROM_EMAIL", "magency550@gmail.com")

    try:
        sent_count = send_mail(
            subject=subject,
            message=message,
            from_email=sender,
            recipient_list=[recipient],
            fail_silently=False,
            html_message=html_message,
        )
        if sent_count > 0:
            logger.info(
                "[EMAIL_DISPATCH_SUCCESS] [%s] Engine: Django SMTP | To: %s | Sent: %d",
                context_label or "N/A",
                recipient,
                sent_count,
            )
            return True, "Delivered via SMTP"
        else:
            logger.warning(
                "[EMAIL_DISPATCH_WARN] [%s] Engine: Django SMTP | To: %s | send_mail returned 0",
                context_label or "N/A",
                recipient,
            )
            return False, "SMTP send_mail returned 0 messages sent"

    except socket.timeout:
        err_msg = (
            f"SMTP connection to {getattr(settings, 'EMAIL_HOST', 'smtp.gmail.com')}:{getattr(settings, 'EMAIL_PORT', 587)} "
            "timed out. Note: Render Free and Starter plans block outbound SMTP ports 25, 465, and 587. "
            "Set RESEND_API_KEY in Render to send via HTTPS."
        )
        logger.error("[EMAIL_DISPATCH_FAILED] [%s] %s", context_label or "N/A", err_msg)
        return False, err_msg

    except ConnectionRefusedError as exc:
        err_msg = (
            f"SMTP connection refused on port {getattr(settings, 'EMAIL_PORT', 587)}. "
            "Render blocks outbound SMTP on this port. Use Resend API over HTTPS."
        )
        logger.error("[EMAIL_DISPATCH_FAILED] [%s] %s: %s", context_label or "N/A", err_msg, exc)
        return False, err_msg

    except Exception as exc:
        logger.error(
            "[EMAIL_DISPATCH_FAILED] [%s] Engine: Django SMTP | To: %s | Error: %s",
            context_label or "N/A",
            recipient,
            exc,
            exc_info=True,
        )
        return False, f"SMTP Error: {str(exc)}"


def send_single_email(
    subject: str,
    message: str,
    recipient: str,
    from_email: Optional[str] = None,
    reply_to: Optional[str] = None,
    html_message: Optional[str] = None,
    context_label: Optional[str] = None,
) -> Tuple[bool, str]:
    """
    Unified entry point for sending a single email.
    Selects Resend API if RESEND_API_KEY is configured; otherwise falls back to SMTP.
    """
    if is_resend_configured():
        success, info = send_via_resend(
            subject=subject,
            message=message,
            recipient=recipient,
            from_email=from_email,
            reply_to=reply_to,
            html_message=html_message,
            context_label=context_label,
        )
        if success:
            return True, info
        # If Resend failed, attempt SMTP fallback if configured
        if is_smtp_configured():
            logger.info(
                "[%s] Resend failed; attempting fallback to configured SMTP...",
                context_label or "N/A",
            )
            return send_via_smtp(
                subject=subject,
                message=message,
                recipient=recipient,
                from_email=from_email,
                html_message=html_message,
                context_label=f"{context_label} (SMTP-Fallback)",
            )
        return False, info

    if is_smtp_configured():
        return send_via_smtp(
            subject=subject,
            message=message,
            recipient=recipient,
            from_email=from_email,
            html_message=html_message,
            context_label=context_label,
        )

    err_msg = (
        "No email service configured. Neither RESEND_API_KEY nor EMAIL_HOST_USER is set. "
        "Email delivery skipped."
    )
    logger.error("[EMAIL_DISPATCH_FAILED] [%s] %s", context_label or "N/A", err_msg)
    return False, err_msg


# ==============================================================================
# Contact Form Notifications
# ==============================================================================

def send_contact_notification_emails(contact: Any) -> Dict[str, Any]:
    """
    Sends:
    1. Admin notification to settings.ADMIN_NOTIFICATION_EMAIL.
    2. Client confirmation to contact.email.
    Tracks and logs statuses per submission ID.
    """
    contact_id = getattr(contact, "pk", getattr(contact, "id", "NEW"))
    submitted_at_str = (
        contact.created_at.strftime("%d-%m-%Y %H:%M IST")
        if getattr(contact, "created_at", None)
        else timezone.now().strftime("%d-%m-%Y %H:%M IST")
    )

    admin_recipient = getattr(
        settings,
        "ADMIN_NOTIFICATION_EMAIL",
        getattr(settings, "EMAIL_HOST_USER", "magency550@gmail.com"),
    )

    results = {
        "admin_sent": False,
        "client_sent": False,
        "errors": [],
    }

    # 1. Admin Notification
    admin_subject = f"🚀 New Contact Request - {contact.full_name}"
    admin_body = f"""\
🚀 NEW CONTACT REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: {contact.full_name}
📧 Email: {contact.email}
📱 Phone: {contact.phone or "Not Provided"}
🏢 Company: {contact.company or "Not Provided"}
💼 Service: {contact.service}
💰 Budget: {contact.budget}

📝 Project Details:
{contact.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted At: {submitted_at_str}
Reference ID: #{contact_id}
Website: https://magencystudio.in
"""

    ok_admin, info_admin = send_single_email(
        subject=admin_subject,
        message=admin_body,
        recipient=admin_recipient,
        reply_to=contact.email if contact.email else None,
        context_label=f"Contact #{contact_id} Admin",
    )
    results["admin_sent"] = ok_admin
    if not ok_admin:
        results["errors"].append(f"Admin Email Failed: {info_admin}")

    # 2. Client Confirmation
    if contact.email:
        client_subject = "✅ We've Received Your Request | Magency Studio"
        client_body = f"""\
Hi {contact.full_name},

Thank you for contacting Magency Studio.

We have successfully received your project inquiry and our team is already reviewing your details.

━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR SUBMISSION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: {contact.full_name}
💼 Service: {contact.service}
💰 Budget: {contact.budget}
📝 Details: {contact.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━
What happens next?
• Our engineering team will review your requirements.
• You can expect a personalized response within the next 24 hours.
• If your request is urgent, simply reply directly to this email.

Best Regards,
The Magency Studio Team

🌐 https://magencystudio.in
📧 magency550@gmail.com
"""

        ok_client, info_client = send_single_email(
            subject=client_subject,
            message=client_body,
            recipient=contact.email,
            reply_to=admin_recipient,
            context_label=f"Contact #{contact_id} Client",
        )
        results["client_sent"] = ok_client
        if not ok_client:
            results["errors"].append(f"Client Email Failed: {info_client}")

    return results


# ==============================================================================
# Booking Form Notifications
# ==============================================================================

def send_booking_notification_emails(booking: Any) -> Dict[str, Any]:
    """
    Sends:
    1. Admin booking notification to settings.ADMIN_NOTIFICATION_EMAIL.
    2. Client consultation confirmation to booking.email.
    Tracks and logs statuses per submission ID.
    """
    booking_id = getattr(booking, "pk", getattr(booking, "id", "NEW"))
    booked_at_str = (
        booking.created_at.strftime("%d-%m-%Y %H:%M IST")
        if getattr(booking, "created_at", None)
        else timezone.now().strftime("%d-%m-%Y %H:%M IST")
    )

    preferred_date_str = (
        booking.preferred_date.strftime("%d-%m-%Y")
        if getattr(booking, "preferred_date", None)
        else "Flexible"
    )
    preferred_time_str = (
        booking.preferred_time.strftime("%H:%M")
        if getattr(booking, "preferred_time", None)
        else "Flexible"
    )

    admin_recipient = getattr(
        settings,
        "ADMIN_NOTIFICATION_EMAIL",
        getattr(settings, "EMAIL_HOST_USER", "magency550@gmail.com"),
    )

    results = {
        "admin_sent": False,
        "client_sent": False,
        "errors": [],
    }

    # 1. Admin Booking Notification
    admin_subject = f"📅 New Consultation Booking - {booking.full_name}"
    admin_body = f"""\
📅 NEW CONSULTATION BOOKING
━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: {booking.full_name}
📧 Email: {booking.email}
📱 Phone: {booking.phone or "Not Provided"}
🏢 Company: {booking.company or "Not Provided"}
💼 Service: {booking.service}
💰 Budget: {booking.budget}

🗓️ Preferred Date: {preferred_date_str}
⏰ Preferred Time: {preferred_time_str}

📝 Project Details:
{booking.project_details}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Booked At: {booked_at_str}
Reference ID: #{booking_id}
Website: https://magencystudio.in
"""

    ok_admin, info_admin = send_single_email(
        subject=admin_subject,
        message=admin_body,
        recipient=admin_recipient,
        reply_to=booking.email if booking.email else None,
        context_label=f"Booking #{booking_id} Admin",
    )
    results["admin_sent"] = ok_admin
    if not ok_admin:
        results["errors"].append(f"Admin Booking Email Failed: {info_admin}")

    # 2. Client Consultation Confirmation
    if booking.email:
        client_subject = "✅ Your Consultation is Scheduled | Magency Studio"
        client_body = f"""\
Hi {booking.full_name},

Thank you for booking a consultation session with Magency Studio.

We have received your appointment request and our team will reach out shortly to confirm the call link and session schedule.

━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR BOOKING SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: {booking.full_name}
💼 Service: {booking.service}
💰 Budget: {booking.budget}
🗓️ Preferred Date: {preferred_date_str}
⏰ Preferred Time: {preferred_time_str}
📝 Details: {booking.project_details}

━━━━━━━━━━━━━━━━━━━━━━━━━━
If you need to reschedule or have questions before our call, simply reply directly to this email.

Best Regards,
The Magency Studio Team

🌐 https://magencystudio.in
📧 magency550@gmail.com
"""

        ok_client, info_client = send_single_email(
            subject=client_subject,
            message=client_body,
            recipient=booking.email,
            reply_to=admin_recipient,
            context_label=f"Booking #{booking_id} Client",
        )
        results["client_sent"] = ok_client
        if not ok_client:
            results["errors"].append(f"Client Booking Email Failed: {info_client}")

    return results

