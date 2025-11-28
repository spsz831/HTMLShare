#!/bin/bash

# HTMLShare One-Click Deployment Script
# This script automates the complete deployment process

set -e  # Exit on any error

echo "🚀 HTMLShare Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    print_error "Wrangler CLI is not installed. Please install it first:"
    echo "npm install -g wrangler"
    exit 1
fi

# Check if user is logged in to Wrangler
print_status "Checking Wrangler authentication..."
if ! wrangler whoami &> /dev/null; then
    print_warning "Not logged in to Wrangler. Please login:"
    wrangler login
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Check if database exists
print_status "Checking database configuration..."
DB_EXISTS=$(wrangler d1 list | grep -c "htmlshare-db" || true)

if [ "$DB_EXISTS" -eq 0 ]; then
    print_status "Creating Cloudflare D1 database..."
    wrangler d1 create htmlshare-db

    print_warning "Please update wrangler.toml with the new database ID"
    print_warning "Press any key when ready to continue..."
    read -n 1 -s
else
    print_success "Database already exists"
fi

# Apply database schema
print_status "Applying database schema..."
wrangler d1 execute htmlshare-db --file=./schema.sql

# Build the project
print_status "Building project..."
npm run build

# Deploy to Cloudflare Pages
print_status "Deploying to Cloudflare Pages..."
wrangler pages publish dist

print_success "🎉 Deployment completed!"
print_status "Your site should be available at: https://htmlshare.pages.dev"

# Optional health check
print_status "Running health check..."
sleep 5  # Wait for deployment to propagate

if curl -f https://htmlshare.pages.dev/ > /dev/null 2>&1; then
    print_success "✅ Site is responding correctly"
else
    print_warning "⚠️  Site might not be ready yet, please check manually"
fi

echo ""
echo "📋 Next steps:"
echo "1. Test your site at https://htmlshare.pages.dev"
echo "2. Configure custom domain if needed"
echo "3. Monitor performance and usage"