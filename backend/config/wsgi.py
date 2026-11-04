"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import logging
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()
app = application

# Automatically run unapplied migrations on server startup (e.g. Render)
try:
    from django.core.management import call_command
    call_command('migrate', interactive=False)
except Exception as _exc:
    logging.getLogger('django').warning('Startup auto-migration skipped or failed: %s', _exc)
