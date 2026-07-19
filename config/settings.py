"""
config/settings.py

Production-ready Django settings for M Agency.

All secrets are read from environment variables — NEVER hardcoded here.

For local development:
  1. Copy .env.example to .env
  2. Fill in your values
  3. pip install python-dotenv   (one-time)

For production deployment:
  Set environment variables in your hosting platform
  (cPanel, Heroku, AWS, Railway, etc.)
"""

import os
from pathlib import Path

# ── Load .env file in development ────────────────────────────
# python-dotenv reads key=value pairs from .env into os.environ.
# If not installed (production servers set vars natively), we skip gracefully.
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass   # Production environment sets variables natively — this is fine.

BASE_DIR = Path(__file__).resolve().parent.parent


# ── Core Security ─────────────────────────────────────────────────────────────

# Generate a new key with:
#   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'django-insecure-dev-only-do-not-use-in-production-replace-me',
)

# SECURITY WARNING: must be False in production.
DEBUG = os.environ.get('DJANGO_DEBUG', 'True') == 'True'

# Comma-separated list: "magencyinfo.com,www.magencyinfo.com"
_allowed = os.environ.get('DJANGO_ALLOWED_HOSTS', '127.0.0.1,localhost')
ALLOWED_HOSTS = [h.strip() for h in _allowed.split(',') if h.strip()]


# ── Installed Apps ────────────────────────────────────────────────────────────

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',   # for sitemap.xml
    'home',
    'services',
    'blog',
    'casestudy',
]


# ── Middleware ────────────────────────────────────────────────────────────────

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# ── Database ──────────────────────────────────────────────────────────────────
# All credentials read from environment variables.

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DB_NAME', 'magency'),
        'USER': os.environ.get('DB_USER', 'root'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', '127.0.0.1'),
        'PORT': os.environ.get('DB_PORT', '3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',       # full Unicode support (emoji, etc.)
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        'CONN_MAX_AGE': 60,             # persistent connections (reduces overhead)
    }
}


# ── Password Validation ───────────────────────────────────────────────────────

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ── Internationalisation ──────────────────────────────────────────────────────

LANGUAGE_CODE = 'en-us'

# IST (Indian Standard Time = UTC+5:30).
# USE_TZ=True means all DB storage is UTC; display is IST.
# Previously 'UTC' caused admin timestamps to be 5h30m behind business hours.
TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True
USE_TZ = True


# ── Static Files ──────────────────────────────────────────────────────────────

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# STATIC_ROOT is where collectstatic copies files for production serving.
# Run: python manage.py collectstatic --noinput
# Previously missing — collectstatic would crash.
STATIC_ROOT = BASE_DIR / 'staticfiles'


# ── Media Files (user uploads) ────────────────────────────────────────────────

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# ── Default Primary Key ───────────────────────────────────────────────────────

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ── Email Configuration ───────────────────────────────────────────────────────
# Credentials read from environment — never hardcoded.

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# ── Admin URL ────────────────────────────────────────────────────────────────
# Obscure the admin path via environment variable.
# Default 'admin/' keeps backward compatibility during development.
# In production, set DJANGO_ADMIN_URL=my-secret-path/ in your environment.
ADMIN_URL = os.environ.get('DJANGO_ADMIN_URL', 'admin/')


# ── Logging ───────────────────────────────────────────────────────────────────

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'home': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}


# ── Security Headers (applied in all environments) ────────────────────────────
# These headers protect against clickjacking, MIME-sniffing, and referrer leaks.
# They are safe to enable in both development and production.

X_FRAME_OPTIONS = 'DENY'                              # Prevent clickjacking
SECURE_CONTENT_TYPE_NOSNIFF = True                    # X-Content-Type-Options: nosniff
SECURE_BROWSER_XSS_FILTER = True                      # X-XSS-Protection (legacy browsers)
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'


# ── Production-Only Security Settings ────────────────────────────────────────
# Only applied when DEBUG=False to avoid breaking local HTTP development.

if not DEBUG:
    # Force all traffic over HTTPS
    SECURE_SSL_REDIRECT = True

    # HSTS: tell browsers to always use HTTPS for 1 year
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

    # Mark session and CSRF cookies as HTTPS-only
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

    # Additional cookie hardening
    SESSION_COOKIE_HTTPONLY = True
    CSRF_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    CSRF_COOKIE_SAMESITE = 'Lax'