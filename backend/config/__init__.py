import sys

try:
    # Try importing the native mysqlclient driver
    import MySQLdb
    # If the imported module is too old (e.g., pre-installed 1.4.6 in Vercel environment),
    # force fallback to PyMySQL by raising ImportError.
    if getattr(MySQLdb, 'version_info', (0, 0, 0)) < (2, 2, 1):
        raise ImportError("Installed mysqlclient version is too old.")
except ImportError:
    # Fallback to PyMySQL if mysqlclient is not installed or is outdated
    try:
        import pymysql
        pymysql.install_as_MySQLdb()
        # Mock version parameters to satisfy Django 5.x/6.x database version checks (requires >= 2.2.1)
        sys.modules['MySQLdb'].version_info = (2, 2, 8, 'final', 0)
        sys.modules['MySQLdb'].__version__ = '2.2.8'
    except ImportError:
        pass
