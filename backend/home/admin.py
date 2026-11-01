from datetime import timedelta

from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html

from .models import Contact, Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    search_fields = ('user__username', 'user__email')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):

    list_display = (
        "status_badge",
        "full_name",
        "email_link",
        "phone_link",
        "company",
        "service",
        "budget",
        "created_at",
    )

    list_filter = (
        "service",
        "budget",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
        "phone",
        "company",
    )

    ordering = ("-created_at",)

    readonly_fields = (
        "created_at",
    )

    date_hierarchy = "created_at"

    # ==========================
    # Status Badge
    # ==========================

    def status_badge(self, obj):

        if obj.created_at >= timezone.now() - timedelta(days=1):
            color = "#ef4444"
            text = "NEW"
        else:
            color = "#10b981"
            text = "VIEWED"

        return format_html(
            '<span style="background:{};color:white;padding:5px 10px;border-radius:20px;font-weight:bold;">{}</span>',
            color,
            text,
        )

    status_badge.short_description = "Status"

    # ==========================
    # Clickable Email
    # ==========================

    def email_link(self, obj):

        return format_html(
            '<a href="mailto:{}">{}</a>',
            obj.email,
            obj.email,
        )

    email_link.short_description = "Email"

    # ==========================
    # Clickable Phone
    # ==========================

    def phone_link(self, obj):

        if obj.phone:
            return format_html(
                '<a href="tel:{}">{}</a>',
                obj.phone,
                obj.phone,
            )

        return "-"

    phone_link.short_description = "Phone"