"""
Management command: create_admin
--------------------------------
Creates a Django superuser from environment variables if one does not already exist.
Safe to run on every deploy — skips creation if the username already exists.

Required environment variables on Render:
    DJANGO_ADMIN_USERNAME   e.g.  admin
    DJANGO_ADMIN_EMAIL      e.g.  magency550@gmail.com
    DJANGO_ADMIN_PASSWORD   e.g.  YourStrongPassword123

Usage (add to Render release command):
    python manage.py migrate && python manage.py create_admin
"""

import os
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a superuser from environment variables (safe to run on every deploy)."

    def handle(self, *args, **options):
        User = get_user_model()

        username = os.environ.get("DJANGO_ADMIN_USERNAME", "").strip()
        email    = os.environ.get("DJANGO_ADMIN_EMAIL", "").strip()
        password = os.environ.get("DJANGO_ADMIN_PASSWORD", "").strip()

        if not username or not password:
            self.stdout.write(self.style.WARNING(
                "create_admin: DJANGO_ADMIN_USERNAME or DJANGO_ADMIN_PASSWORD not set — skipping."
            ))
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.SUCCESS(
                f"create_admin: Superuser '{username}' already exists — skipping."
            ))
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(
            f"create_admin: Superuser '{username}' created successfully."
        ))
