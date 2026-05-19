#!/bin/sh
set -e

echo "🔄 Checking database migration status..."
echo "ℹ️ Note: Database migrations should be run separately using the db-migrate service"
echo "ℹ️ Run: docker compose --profile migration up db-migrate"

echo "🚀 Starting web server..."
exec "$@"