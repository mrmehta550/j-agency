from django import forms
from django.core.exceptions import ValidationError
from datetime import date
from .models import Contact


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
                "placeholder": "Enter your full name"
            }),

            "company": forms.TextInput(attrs={
                "class": "booking-input",
                "placeholder": "Company name (Optional)"
            }),

            "email": forms.EmailInput(attrs={
                "class": "booking-input",
                "placeholder": "example@gmail.com"
            }),

            "phone": forms.TextInput(attrs={
                "class": "booking-input",
                "placeholder": "+91 XXXXX XXXXX"
            }),

            "service": forms.Select(attrs={
                "class": "booking-select"
            }),

            "budget": forms.Select(attrs={
                "class": "booking-select"
            }),

            "project_details": forms.Textarea(attrs={
                "class": "booking-textarea",
                "rows": 6,
                "placeholder": "Describe your project..."
            }),

            "preferred_date": forms.DateInput(attrs={
                "class": "booking-input",
                "type": "date"
            }),

            "preferred_time": forms.TimeInput(attrs={
                "class": "booking-input",
                "type": "time"
            }),

        }

    def clean_phone(self):

        phone = self.cleaned_data["phone"]

        phone = phone.replace(" ", "").replace("-", "")

        if len(phone) < 10:

            raise ValidationError(
                "Phone number must contain at least 10 digits."
            )

        return phone

    def clean_preferred_date(self):

        booking_date = self.cleaned_data["preferred_date"]

        if booking_date < date.today():

            raise ValidationError(
                "Please select a future date."
            )

        return booking_date

    def clean_email(self):

        email = self.cleaned_data["email"]

        return email.lower()