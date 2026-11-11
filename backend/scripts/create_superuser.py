import os
import sys

# Ensure the project root is in sys.path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(BASE_DIR)

# Load Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

# Read credentials from environment (set them in .env or export before running)
USERNAME = os.getenv('SUPERUSER_USERNAME', 'admin')
EMAIL = os.getenv('SUPERUSER_EMAIL', 'admin@example.com')
PASSWORD = os.getenv('SUPERUSER_PASSWORD')  # Must be set, no default for security

if not PASSWORD:
    print('Error: SUPERUSER_PASSWORD environment variable not set.')
    sys.exit(1)

User = get_user_model()
if User.objects.filter(username=USERNAME).exists():
    print(f'Superuser "{USERNAME}" already exists.')
else:
    User.objects.create_superuser(
        username=USERNAME,
        email=EMAIL,
        password=PASSWORD,
    )
    print(f'Superuser "{USERNAME}" created successfully.')

