#!/bin/bash
# ==========================================
# 🚀 DEPLOY SCRIPT - Alkautsar Masjid
# Sync project ke VPS + Build + Clear Cache
# ==========================================

set -e

VPS_USER="cempaka"
VPS_IP="103.55.38.184"
VPS_PATH="/var/www/alkautsar.masjid.world"

# Cari SSH key
if [ -f "$HOME/.ssh/id_ed25519" ]; then
    SSH_KEY="$HOME/.ssh/id_ed25519"
elif [ -f "/mnt/c/Users/PC/.ssh/id_ed25519" ]; then
    SSH_KEY="/mnt/c/Users/PC/.ssh/id_ed25519"
elif [ -f "/mnt/c/Users/pc/.ssh/id_ed25519" ]; then
    SSH_KEY="/mnt/c/Users/pc/.ssh/id_ed25519"
else
    echo "❌ SSH key tidak ditemukan!"
    exit 1
fi

# Copy key ke temp dengan permission bener
KEY_TEMP="/tmp/deploy_key_$$"
cp "$SSH_KEY" "$KEY_TEMP"
chmod 600 "$KEY_TEMP"
SSH_KEY="$KEY_TEMP"

# Cleanup on exit
trap 'rm -f "$KEY_TEMP"' EXIT

LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 DEPLOY KE VPS"
echo "  📁 $LOCAL_PATH"
echo "  🖥️  $VPS_USER@$VPS_IP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. CEK SSH KEY
if [ ! -f "$SSH_KEY" ]; then
    echo "❌ SSH key tidak ditemukan di $SSH_KEY"
    exit 1
fi

SSH_CMD="ssh -i $SSH_KEY -o StrictHostKeyChecking=no"

# 2. TAR & SYNC FILE KE VPS (exclude vendor, node_modules, .git, build)
echo ""
echo "📦 Packing file..."
ARCHIVE="/tmp/deploy_$$.tar.gz"
tar czf "$ARCHIVE" \
    --exclude='vendor' \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.env' \
    --exclude='storage/app/public' \
    --exclude='public/build' \
    --exclude='public/storage' \
    --exclude='public/hot' \
    --exclude='deploy.sh' \
    -C "$LOCAL_PATH" .

echo "📤 Upload ke VPS..."
scp -i "$SSH_KEY" "$ARCHIVE" "$VPS_USER@$VPS_IP:/tmp/"
rm -f "$ARCHIVE"

# 3. EKSTRAK DI VPS
ARCHIVE_NAME="deploy_$$.tar.gz"
$SSH_CMD "$VPS_USER@$VPS_IP" "sudo tar xzf /tmp/$ARCHIVE_NAME -C $VPS_PATH && sudo chown -R www-data:www-data $VPS_PATH && rm -f /tmp/$ARCHIVE_NAME"

echo "✅ Sync selesai!"

# 4. INSTALL DEPENDENCIES & BUILD DI VPS
echo ""
echo "🔧 Install dependencies & build di VPS..."
$SSH_CMD "$VPS_USER@$VPS_IP" bash -s << 'DEPLOY'
    set -e
    cd /var/www/alkautsar.masjid.world

    echo "  → Permission bootstrap/cache..."
    # Fix dulu biar cempaka bisa nulis pas composer install & package:discover
    sudo chown -R cempaka:www-data bootstrap/cache
    sudo chmod -R 775 bootstrap/cache
    # Hapus cache stale dari lokal (packages.php & services.php mungkin masih
    # refer ke dev dependencies kayak Pail yang gak diinstall --no-dev)
    sudo rm -f bootstrap/cache/packages.php bootstrap/cache/services.php

    echo "  → Composer install..."
    composer install --no-dev --optimize-autoloader --no-interaction 2>&1 | tail -2

    echo "  → NPM install..."
    npm install --silent 2>&1 | tail -1

    echo "  → Build frontend..."
    sudo chown -R cempaka:cempaka public/build 2>/dev/null || true
    npm run build 2>&1 | tail -3
    sudo chown -R www-data:www-data public/build 2>/dev/null || true

    echo "  → Cache Laravel..."
    php artisan route:clear 2>&1 | tail -1
    php artisan config:clear 2>&1 | tail -1
    php artisan view:clear 2>&1 | tail -1

    echo "  → Migration database..."
    php artisan migrate --force 2>&1 | tail -2

    echo "  → Permission..."
    # storage: writable by www-data (web logs, sessions)
    sudo chown -R www-data:www-data storage
    sudo chmod -R 775 storage
    # build: readable by www-data (web server)
    sudo chown -R www-data:www-data public/build
    echo "  → Fix storage link..."
    sudo rm -f public/storage
    sudo php artisan storage:link 2>&1 | tail -1

    echo "DEPLOY_OK"
DEPLOY

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ DEPLOY BERHASIL!"
echo "  🔗 https://alkautsar.masjid.world"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
