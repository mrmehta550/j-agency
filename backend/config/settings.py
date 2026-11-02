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

# ── Database Resolution ───────────────────────────────────────────────────────
import dj_database_url
import urllib.parse as _urlparse

# Primary: PostgreSQL via DATABASE_URL (for Render / Production)
_database_url = (
    os.getenv('DATABASE_URL')
    or os.getenv('DATABASE_PRIVATE_URL')
    or ''
)

# Optional MySQL fallback (for Railway / Legacy)
_mysql_url = (
    os.getenv('MYSQL_URL')
    or os.getenv('MYSQL_PRIVATE_URL')
    or ''
)

if _mysql_url:
    _parsed = _urlparse.urlparse(_mysql_url)
    _db_host = _parsed.hostname or ''
    _db_port = str(_parsed.port) if _parsed.port else '3306'
    _db_user = _parsed.username or ''
    _db_password = _urlparse.unquote(_parsed.password) if _parsed.password else ''
    _db_name = _parsed.path.lstrip('/') if _parsed.path else ''
else:
    _db_host = os.getenv('MYSQLHOST') or os.getenv('DB_HOST', '127.0.0.1')
    _db_port = os.getenv('MYSQLPORT') or os.getenv('DB_PORT', '3306')
    _db_user = os.getenv('MYSQLUSER') or os.getenv('DB_USER', 'root')
    _db_password = os.getenv('MYSQLPASSWORD') or os.getenv('DB_PASSWORD', '')
    _db_name = os.getenv('MYSQLDATABASE') or os.getenv('DB_NAME', '')


BASE_DIR = Path(__file__).resolve().parent.parent


# ── Core Security ─────────────────────────────────────────────────────────────

# Secret Key: read from DJANGO_SECRET_KEY or SECRET_KEY (set in Render environment)
SECRET_KEY = (
    os.environ.get('DJANGO_SECRET_KEY')
    or os.environ.get('SECRET_KEY')
    or 'django-insecure-dev-only-do-not-use-in-production-replace-me'
)

# SECURITY WARNING: must be False in production.
_debug_env = os.environ.get('DJANGO_DEBUG', os.environ.get('DEBUG', 'False'))
DEBUG = _debug_env.lower() in ('true', '1', 'yes')

# Comma-separated list via ALLOWED_HOSTS env var; includes Render & local defaults.
_allowed_hosts_env = os.getenv("ALLOWED_HOSTS", "")
if _allowed_hosts_env:
    ALLOWED_HOSTS = [host.strip() for host in _allowed_hosts_env.split(",") if host.strip()]
else:
    ALLOWED_HOSTS = [
        "localhost",
        "127.0.0.1",
        ".onrender.com",
        "magencyinfo.com",
        "www.magencyinfo.com",
    ]

# Render automatically provides RENDER_EXTERNAL_HOSTNAME (e.g. your-backend-domain.onrender.com)
_render_hostname = os.getenv("RENDER_EXTERNAL_HOSTNAME")
if _render_hostname and _render_hostname not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(_render_hostname)

# CSRF Trusted Origins (Required in Django 4.0+ for HTTPS form submissions)
_csrf_origins_env = os.getenv("CSRF_TRUSTED_ORIGINS", "")
if _csrf_origins_env:
    CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in _csrf_origins_env.split(",") if origin.strip()]
else:
    CSRF_TRUSTED_ORIGINS = [
        "https://*.onrender.com",
        "https://j-agency-wlpt.vercel.app",
        "https://*.vercel.app",
        "https://magencyinfo.com",
        "https://www.magencyinfo.com",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

# Reverse proxy SSL header (essential for Render / Cloudflare / Nginx HTTPS detection)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')



# ── Installed Apps ────────────────────────────────────────────────────────────

INSTALLED_APPS = [

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',   # for sitemap.xml
    'corsheaders',
    'rest_framework',
    'home',
    'services',
    'blog',
    'casestudy',
]


# ── Middleware ────────────────────────────────────────────────────────────────

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ── CORS Settings ─────────────────────────────────────────────────────────────
# Strict origin isolation for production - never allow all origins
CORS_ALLOW_ALL_ORIGINS = False

_cors_origins_env = os.getenv("CORS_ALLOWED_ORIGINS", "")
if _cors_origins_env:
    CORS_ALLOWED_ORIGINS = [
        origin.strip() for origin in _cors_origins_env.split(",") if origin.strip()
    ]
else:
    CORS_ALLOWED_ORIGINS = [
        "https://j-agency-wlpt.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://magencyinfo.com",
        "https://www.magencyinfo.com",
    ]

# Allow Vercel preview deployments for the project if enabled via env or matching project name
_cors_regex_env = os.getenv("CORS_ALLOWED_ORIGIN_REGEXES", "")
if _cors_regex_env:
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r.strip() for r in _cors_regex_env.split(",") if r.strip()
    ]
else:
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r"^https:\/\/j-agency-wlpt.*\.vercel\.app$",
    ]

CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

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
# Production: PostgreSQL via DATABASE_URL (configured through dj-database-url)
# Fallback: MySQL if MYSQL_URL or MYSQLHOST is explicitly configured
# Fallback: SQLite3 for local development if no PostgreSQL/MySQL is configured

if _database_url:
    DATABASES = {
        'default': dj_database_url.config(
            default=_database_url,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
elif _mysql_url or os.getenv('MYSQLHOST') or (os.getenv('DB_NAME') and os.getenv('DB_NAME') != 'railway'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': _db_name,
            'USER': _db_user,
            'PASSWORD': _db_password,
            'HOST': _db_host,
            'PORT': _db_port,
            'OPTIONS': {
                'charset': 'utf8mb4',
                'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            },
            'CONN_MAX_AGE': 60,
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
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

# WhiteNoise storage: compresses files efficiently without crashing on missing source maps
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}


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