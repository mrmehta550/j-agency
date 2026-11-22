#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    # Ensure backend package is on PYTHONPATH
    sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
