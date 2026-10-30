#!/bin/bash
set -e

# Create .env if it doesn't exist
cp -n .env.example .env 2>/dev/null || true

echo "Esperant a MySQL..."
while ! php -r "try { new PDO('mysql:host='.getenv('DB_HOST').';port='.getenv('DB_PORT'), getenv('DB_USERNAME'), getenv('DB_PASSWORD')); } catch(\Exception \$e) { exit(1); }" 2>/dev/null; do
    sleep 2
    echo "  Reintentant connexió..."
done
echo "MySQL llest!"

# Generate application key
php artisan key:generate --force

# Run migrations
php artisan migrate --force

# Seed database
php artisan db:seed --force 2>/dev/null || true

echo ""
echo "=========================================="
echo "  SOLUCIÓ RA7 - Aplicació llesta!"
echo "  URL: http://localhost:8701/api/recipes"
echo "=========================================="
echo ""

exec "$@"
