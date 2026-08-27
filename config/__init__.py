import sys

try:
    # Try importing the native mysqlclient driver
    import MySQLdb
except ImportError:
    # Fallback to PyMySQL if mysqlclient is not installed (e.g. serverless environments)
    try:
        import pymysql
        pymysql.install_as_MySQLdb()
        # Mock version parameters to satisfy Django 5.x/6.x database version checks (requires >= 2.2.1)
        sys.modules['MySQLdb'].version_info = (2, 2, 8, 'final', 0)
        sys.modules['MySQLdb'].__version__ = '2.2.8'
    except ImportError:
        pass
