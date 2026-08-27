import os
import sys

# Add project root directory to path so imports work correctly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

from config.wsgi import application

# Vercel python serverless handler requires a global named 'app'
app = application
