FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev default-mysql-client \
    && docker-php-ext-install pdo_mysql zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Create Laravel project
RUN composer create-project laravel/laravel . --prefer-dist --no-interaction

# Install Pest for testing
RUN composer require pestphp/pest pestphp/pest-plugin-laravel --dev --with-all-dependencies \
    && yes | ./vendor/bin/pest --init 2>/dev/null || true

# Copy custom source files (overlays on top of Laravel defaults)
COPY src/ /var/www/html/

# Copy entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
