"""
Django Management Command: create_production_admin

Safely creates a Django superuser in the target (production or local) database.
Supports:
1. Interactive prompt with masked password input (getpass) when run in a terminal.
2. Non-interactive execution (--no-input) reading from environment variables
   (DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, DJANGO_SUPERUSER_PASSWORD)
   for automated CI/CD and Render Free build scripts where interactive TTY is unavailable.
3. Duplicate user detection: safely prevents duplicate creation or crashing.
"""

import getpass
import os
import sys
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import connection, transaction


class Command(BaseCommand):
    help = "Safely creates a Django superuser in the configured database without exposing credentials."

    def add_arguments(self, parser):
        parser.add_argument(
            "--username",
            type=str,
            help="Specifies the username for the superuser.",
        )
        parser.add_argument(
            "--email",
            type=str,
            help="Specifies the email for the superuser.",
        )
        parser.add_argument(
            "--no-input",
            "--noinput",
            action="store_true",
            dest="no_input",
            help="Tells Django to NOT prompt the user for input. Reads credentials from environment variables.",
        )
        parser.add_argument(
            "--database",
            default="default",
            help='Nominates a specific database to use. Defaults to the "default" database.',
        )

    def handle(self, *args, **options):
        database = options["database"]
        User = get_user_model()
        db_settings = connection.settings_dict

        # Display safe database connection information
        db_engine = db_settings.get("ENGINE", "").split(".")[-1]
        db_name = db_settings.get("NAME", "unknown")
        db_host = db_settings.get("HOST", "localhost") or "localhost"

        self.stdout.write(
            self.style.MIGRATE_HEADING(
                f"\n=== Create Production Admin ==="
            )
        )
        self.stdout.write(
            f"Target Database Engine: {db_engine}\n"
            f"Target Database Name:   {db_name}\n"
            f"Target Database Host:   {db_host}\n"
        )

        is_interactive = not options["no_input"] and sys.stdin.isatty()

        if is_interactive:
            # ─────────────────────────────────────────────────────────────
            # Interactive Mode (Local Terminal connected to Prod DB)
            # ─────────────────────────────────────────────────────────────
            self.stdout.write(self.style.NOTICE("Running in interactive mode.\n"))

            # 1. Username
            while True:
                default_user = options.get("username") or ""
                prompt_text = f"Username [{default_user}]: " if default_user else "Username: "
                username = input(prompt_text).strip() or default_user
                if not username:
                    self.stderr.write(self.style.ERROR("Error: Username cannot be blank."))
                    continue

                # Duplicate check
                if User.objects.using(database).filter(username=username).exists():
                    existing_user = User.objects.using(database).get(username=username)
                    if existing_user.is_superuser:
                        self.stdout.write(
                            self.style.WARNING(
                                f"A superuser with username '{username}' already exists. No changes made."
                            )
                        )
                        return
                    else:
                        confirm = input(
                            f"User '{username}' already exists but is not a superuser. Promote to superuser? [y/N]: "
                        ).strip().lower()
                        if confirm in ("y", "yes"):
                            existing_user.is_superuser = True
                            existing_user.is_staff = True
                            existing_user.save(using=database)
                            self.stdout.write(
                                self.style.SUCCESS(
                                    f"Successfully promoted '{username}' to superuser!"
                                )
                            )
                            return
                        else:
                            self.stdout.write(self.style.NOTICE("Aborted."))
                            return
                break

            # 2. Email
            default_email = options.get("email") or ""
            prompt_email = f"Email address [{default_email}]: " if default_email else "Email address: "
            email = input(prompt_email).strip() or default_email

            # 3. Password
            while True:
                password = getpass.getpass("Password: ")
                if not password:
                    self.stderr.write(self.style.ERROR("Error: Password cannot be blank."))
                    continue

                password_again = getpass.getpass("Password (again): ")
                if password != password_again:
                    self.stderr.write(self.style.ERROR("Error: Passwords do not match. Please try again."))
                    continue

                # Run Django built-in password validators
                try:
                    validate_password(password, user=User(username=username, email=email))
                except ValidationError as e:
                    self.stderr.write(self.style.WARNING("\n".join(e.messages)))
                    confirm_weak = input("Bypass password validation and use this password anyway? [y/N]: ").strip().lower()
                    if confirm_weak not in ("y", "yes"):
                        continue

                break

        else:
            # ─────────────────────────────────────────────────────────────
            # Non-Interactive Mode (e.g. Render Build Command / CI)
            # ─────────────────────────────────────────────────────────────
            self.stdout.write(self.style.NOTICE("Running in non-interactive mode.\n"))

            username = options.get("username") or os.environ.get("DJANGO_SUPERUSER_USERNAME", "").strip()
            email = options.get("email") or os.environ.get("DJANGO_SUPERUSER_EMAIL", "").strip()
            password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "").strip()

            if not username:
                raise CommandError(
                    "You must provide a username via --username or DJANGO_SUPERUSER_USERNAME environment variable."
                )
            if not password:
                raise CommandError(
                    "You must provide a password via DJANGO_SUPERUSER_PASSWORD environment variable in non-interactive mode."
                )

            # Check if user already exists
            if User.objects.using(database).filter(username=username).exists():
                existing = User.objects.using(database).get(username=username)
                if existing.is_superuser:
                    self.stdout.write(
                        self.style.WARNING(
                            f"Superuser '{username}' already exists. Skipping duplicate creation."
                        )
                    )
                    return
                else:
                    existing.is_superuser = True
                    existing.is_staff = True
                    existing.save(using=database)
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"Existing user '{username}' promoted to superuser."
                        )
                    )
                    return

        # ─────────────────────────────────────────────────────────────
        # Create Superuser inside Transaction
        # ─────────────────────────────────────────────────────────────
        try:
            with transaction.atomic(using=database):
                User.objects.db_manager(database).create_superuser(
                    username=username,
                    email=email,
                    password=password,
                )
            self.stdout.write(
                self.style.SUCCESS(
                    f"\n[OK] Superuser '{username}' created successfully in database '{database}'!"
                )
            )
            self.stdout.write(
                self.style.NOTICE(
                    "You can now log in at https://your-backend-domain/admin/"
                )
            )
        except Exception as exc:
            raise CommandError(f"Failed to create superuser: {exc}")

