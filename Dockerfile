# Image de base
FROM ubuntu:22.04 AS base

# mise à jour apt 
RUN apt-get update && apt-get install -y \
    curl \
    openssl \
    iputils-ping \
    gnupg2 \
    ca-certificates \
    software-properties-common \
    lsb-release \
    unzip \
    apt-transport-https \
    && rm -rf /var/lib/apt/lists/*

# installation php et des extensions
RUN add-apt-repository ppa:ondrej/php && apt-get update && apt-get install -y \
    php8.2-fpm \
    php8.2-cli \
    php8.2-intl \
    php8.2-pdo \
    php8.2-pgsql \
    php8.2-zip \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-curl \
    php8.2-bcmath \
    php8.2-gd \
    php8.2-mysql \
    php8.2-opcache \
    default-mysql-client \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer et Symfony CLI
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Création du frontend
FROM base AS frontend

# Node.js et Nginx
RUN curl -sL https://deb.nodesource.com/setup_21.x | bash - && apt-get update && apt-get install -y \
    nodejs \
    nginx \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/frontend

COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci --ignore-scripts

COPY frontend/ .

ARG NODE_GID=1000
RUN groupadd -g $NODE_GID node && useradd -r -u 1000 -g node node

RUN chown -R node:node /var/www/frontend

USER node
RUN npm run build

# Construction du backend
FROM base AS backend

WORKDIR /var/www/backend

COPY backend/composer.json backend/composer.lock ./

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs --no-scripts --no-interaction

COPY backend/ ./

# On change les droits sur les dossiers
RUN chown -R www-data:www-data /var/www/backend/public /var/www/backend/var
RUN chmod -R 755 /var/www/backend/public /var/www/backend/var

# Configuration Nginx et PHP-FPM
FROM base AS final

# Installer Nginx et Supervisor
RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=frontend /var/www/frontend/build /usr/share/nginx/html

COPY --from=backend /var/www/backend/public /var/www/backend/public

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord"]