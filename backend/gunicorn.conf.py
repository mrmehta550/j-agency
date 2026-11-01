import os

# Bind to Render-provided PORT (defaults to 8000 for local testing)
port = os.getenv("PORT", "8000")
bind = f"0.0.0.0:{port}"

workers = int(os.getenv("WEB_CONCURRENCY", "2"))
threads = 4
timeout = 120
keepalive = 5
accesslog = "-"
errorlog = "-"
