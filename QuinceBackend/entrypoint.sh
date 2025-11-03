#!/bin/sh
set -e

# Ensure the mount exists and is writable
mkdir -p /var/data
# Open permissions so the non-root app user can write the SQLite file
chmod 777 /var/data || true

# Start the app
exec dotnet QuinceBackend.dll
