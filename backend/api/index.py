import os
import sys

# Add project root directory to path so imports work correctly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Initialize PyMySQL database driver fallback immediately in Vercel serverless environment.
# This prevents the ImproperlyConfigured version mismatch error by mocking mysqlclient >= 2.2.1.
try:
    import pymysql
    pymysql.install_as_MySQLdb()
    # Mock mysqlclient version to satisfy Django 5.x/6.x checks (requires >= 2.2.1)
    sys.modules['MySQLdb'].version_info = (2, 2, 8, 'final', 0)
    sys.modules['MySQLdb'].__version__ = '2.2.8'
except ImportError:
    pass

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

class DebuggingWSGIApplication:
    def __init__(self):
        self.real_app = None
        self.import_error = None
        self.traceback_str = None

    def get_real_app(self):
        if self.real_app is not None:
            return self.real_app
        if self.import_error is not None:
            return None
        try:
            from config.wsgi import application
            self.real_app = application
            return self.real_app
        except Exception as e:
            import traceback
            self.import_error = e
            self.traceback_str = traceback.format_exc()
            return None

    def __call__(self, environ, start_response):
        real_app = self.get_real_app()
        if real_app is not None:
            try:
                return real_app(environ, start_response)
            except Exception as e:
                import traceback
                self.traceback_str = traceback.format_exc()
        
        # Render error traceback
        status = '500 Internal Server Error'
        headers = [('Content-Type', 'text/html; charset=utf-8')]
        start_response(status, headers)
        
        tb = self.traceback_str or "Unknown boot error"
        html = f"""
        <html>
        <head><title>Vercel Django Boot Error</title></head>
        <body style="font-family: monospace; padding: 20px; background: #fafafa; color: #333;">
            <h1 style="color: #d9534f;">Django Boot / Request Execution Failed</h1>
            <p>The following traceback was captured during serverless function execution:</p>
            <pre style="background: #eee; padding: 15px; border-radius: 5px; overflow-x: auto; border: 1px solid #ccc;">{tb}</pre>
        </body>
        </html>
        """
        return [html.encode('utf-8')]

app = DebuggingWSGIApplication()

