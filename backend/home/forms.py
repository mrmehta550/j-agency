from datetime import date

from django import forms
from django.core.exceptions import ValidationError

from .models import Contact


# ============================================================
# ContactForm — used by the /contact/ page
# ============================================================

class ContactForm(forms.Form):
    """
    Standalone form (not a ModelForm) for the contact page.

    Why not ModelForm?
    ------------------
    The contact view builds a fingerprint and runs a duplicate-lock
    check before saving.  Using a plain Form keeps validation and
    persistence cleanly separated, so the view controls exactly when
    and how the model is written.
    """

    full_name = forms.CharField(
        max_length=150,
        strip=True,
        error_messages={"required": "Please enter your full name."},
        widget=forms.TextInput(attrs={
            "placeholder": "Enter your full name",
            "autocomplete": "name",
        }),
    )

    email = forms.EmailField(
        error_messages={"required": "Please enter your email address."},
        widget=forms.EmailInput(attrs={
            "placeholder": "example@gmail.com",
            "autocomplete": "email",
        }),
    )

    phone = forms.CharField(
        max_length=20,
        strip=True,
        error_messages={"required": "Please enter your phone number."},
        widget=forms.TextInput(attrs={
            "placeholder": "+91 XXXXX XXXXX",
            "autocomplete": "tel",
        }),
    )

    company = forms.CharField(
        max_length=200,
        strip=True,
        required=False,
        widget=forms.TextInput(attrs={
            "placeholder": "Your Company (Optional)",
            "autocomplete": "organization",
        }),
    )

    service = forms.ChoiceField(
        choices=[
            ("Website Development", "Website Development"),
            ("AI Automation", "AI Automation"),
            ("Mobile App Development", "Mobile App Development"),
            ("UI / UX Design", "UI / UX Design"),
            ("SEO Optimization", "SEO Optimization"),
            ("Digital Marketing", "Digital Marketing"),
            ("Cloud Solutions", "Cloud Solutions"),
            ("E-Commerce Development", "E-Commerce Development"),
        ],
        error_messages={"required": "Please select a service."},
    )

    budget = forms.ChoiceField(
        choices=[
            ("Under ₹25,000", "Under ₹25,000"),
            ("₹25,000 - ₹50,000", "₹25,000 - ₹50,000"),
            ("₹50,000 - ₹1,00,000", "₹50,000 - ₹1,00,000"),
            ("Above ₹1,00,000", "Above ₹1,00,000"),
        ],
        error_messages={"required": "Please select an estimated budget."},
    )

    message = forms.CharField(
        strip=True,
        error_messages={"required": "Please describe your project."},
        widget=forms.Textarea(attrs={
            "rows": 6,
            "placeholder": "Tell us about your project...",
        }),
    )

    # ----------------------------------------------------------
    # Field-level cleaners
    # ----------------------------------------------------------

    def clean_email(self):
        """Normalise email to lowercase so fingerprints are consistent."""
        return self.cleaned_data["email"].lower()

    def clean_phone(self):
        """
        Strip common separators and enforce a minimum digit count.
        Stored normalised so fingerprints are stable across formatting variants.
        """
        phone = self.cleaned_data["phone"]
        normalised = phone.replace(" ", "").replace("-", "").replace("+", "")

        if not normalised.isdigit():
            raise ValidationError("Phone number must contain only digits, spaces, dashes or a leading +.")

        if len(normalised) < 10:
            raise ValidationError("Phone number must contain at least 10 digits.")

        return normalised

    def clean_message(self):
        """Require a minimum project description so submissions are actionable."""
        message = self.cleaned_data["message"]

        if len(message.strip()) < 20:
            raise ValidationError("Please provide at least 20 characters describing your project.")

        return message.strip()


# ============================================================
# BookingForm — used by the /booking/ page
# ============================================================

class BookingForm(forms.ModelForm):

    class Meta:
        model = Contact
        fields = [
            "full_name",
            "company",
            "email",
            "phone",
            "service",
            "budget",
            "project_details",
            "preferred_date",
            "preferred_time",
        ]

        widgets = {
            "full_name": forms.TextInput(attrs={
                "class": "booking-input",
                "placeholder": "Enter your full name",
            }),
            "company": forms.TextInput(attrs={
                "class": "booking-input",
                "placeholder": "Company name (Optional)",
            }),
            "email": forms.EmailInput(attrs={
                "class": "booking-input",
                "placeholder": "example@gmail.com",
            }),
            "phone": forms.TextInput(attrs={
                "class": "booking-input",
                "placeholder": "+91 XXXXX XXXXX",
            }),
            "service": forms.Select(attrs={
                "class": "booking-select",
            }),
            "budget": forms.Select(attrs={
                "class": "booking-select",
            }),
            "project_details": forms.Textarea(attrs={
                "class": "booking-textarea",
                "rows": 6,
                "placeholder": "Describe your project...",
            }),
            "preferred_date": forms.DateInput(attrs={
                "class": "booking-input",
                "type": "date",
            }),
            "preferred_time": forms.TimeInput(attrs={
                "class": "booking-input",
                "type": "time",
            }),
        }

    def clean_phone(self):
        """
        Strip whitespace, dashes and the leading '+' so that international
        formats like +91 98765-43210 are accepted and stored consistently.
        """
        phone = self.cleaned_data["phone"]
        normalised = phone.replace(" ", "").replace("-", "").replace("+", "")

        if not normalised.isdigit():
            raise ValidationError(
                "Phone number must contain only digits, spaces, dashes or a leading +."
            )

        if len(normalised) < 10:
            raise ValidationError("Phone number must contain at least 10 digits.")

        return normalised

    def clean_project_details(self):
        """
        Reject empty or trivially short descriptions so every booking
        record contains enough context for the team to act on it.
        """
        details = self.cleaned_data.get("project_details", "").strip()

        if len(details) < 10:
            raise ValidationError(
                "Please provide at least 10 characters describing your project."
            )

        return details

    def clean_preferred_date(self):
        """
        Reject past dates but allow a blank date — preferred_date is
        an optional field on the booking form.
        """
        booking_date = self.cleaned_data.get("preferred_date")

        # Field is optional — nothing to validate if left blank.
        if booking_date is None:
            return booking_date

        if booking_date < date.today():
            raise ValidationError("Please select today or a future date.")

        return booking_date

    def clean_email(self):
        email = self.cleaned_data["email"]
        return email.lower()