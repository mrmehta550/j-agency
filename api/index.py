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

from config.wsgi import application

# Vercel python handler requires a global named 'app'
app = application
