"""
app.py - WSGI entrypoint for platforms (like Render) that run `gunicorn app:app` by default.
"""
from config.wsgi import application

app = application
