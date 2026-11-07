"""
Django Management Command: test_email

Diagnoses and tests email delivery (Resend HTTPS API or Django SMTP).
Usage:
    python manage.py test_email
    python manage.py test_email --to=magency550@gmail.com
"""

import sys
from django.core.management.base import BaseCommand
from django.conf import settings
from home.email_service import (
    is_resend_configured,
    is_smtp_configured,
    send_single_email,
    _mask_secret,
)


class Command(BaseCommand):
    help = "Tests and verifies production email delivery configuration."

    def add_arguments(self, parser):
        parser.add_argument(
            "--to",
            type=str,
            default=getattr(settings, "ADMIN_NOTIFICATION_EMAIL", "magency550@gmail.com"),
            help="Recipient email address for the test message.",
        )

    def handle(self, *args, **options):
        recipient = options["to"]

        resend_ok = is_resend_configured()
        smtp_ok = is_smtp_configured()

        self.stdout.write(self.style.MIGRATE_HEADING("\n=== Email Delivery Diagnostics ==="))
        self.stdout.write(f"Resend Configured: {'YES' if resend_ok else 'NO'}")
        if resend_ok:
            api_key = getattr(settings, "RESEND_API_KEY", "")
            from_email = getattr(settings, "RESEND_FROM_EMAIL", "")
            self.stdout.write(f"  - RESEND_API_KEY: {_mask_secret(api_key)}")
            self.stdout.write(f"  - RESEND_FROM_EMAIL: {from_email}")

        self.stdout.write(f"SMTP Configured:   {'YES' if smtp_ok else 'NO'}")
        if smtp_ok:
            self.stdout.write(f"  - EMAIL_HOST:      {getattr(settings, 'EMAIL_HOST', '')}")
            self.stdout.write(f"  - EMAIL_PORT:      {getattr(settings, 'EMAIL_PORT', '')}")
            self.stdout.write(f"  - EMAIL_USE_TLS:   {getattr(settings, 'EMAIL_USE_TLS', '')}")
            self.stdout.write(f"  - EMAIL_HOST_USER: {getattr(settings, 'EMAIL_HOST_USER', '')}")

        self.stdout.write(f"\nDispatching test email to: {recipient} ...")

        subject = "🧪 Magency Studio — Email Delivery Verification"
        body = f"""\
This is an automated verification email from Magency Studio.

Engine: {'Resend API (HTTPS)' if resend_ok else 'Django SMTP'}
Recipient: {recipient}
Status: Online & Delivering
Timestamp: {options.get('timestamp', 'Now')}

If you received this message, your backend email pipeline is functioning properly.
"""

        success, info = send_single_email(
            subject=subject,
            message=body,
            recipient=recipient,
            context_label="Diagnostic Test",
        )

        if success:
            self.stdout.write(
                self.style.SUCCESS(
                    f"\n[OK] Test email delivered successfully to {recipient}!\nDetails: {info}"
                )
            )
        else:
            self.stdout.write(
                self.style.ERROR(
                    f"\n[FAIL] Email delivery failed.\nDetails: {info}"
                )
            )
            sys.exit(1)

