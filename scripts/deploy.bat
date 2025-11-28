@echo off
REM HTMLShare One-Click Deployment Script for Windows
REM This script automates the complete deployment process

echo.
echo 🚀 HTMLShare Deployment Script
echo ================================

REM Check if wrangler is installed
where wrangler >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Wrangler CLI is not installed. Please install it first:
    echo npm install -g wrangler
    exit /b 1
)

REM Check if user is logged in to Wrangler
echo [INFO] Checking Wrangler authentication...
wrangler whoami >nul 2>nul
if errorlevel 1 (
    echo [WARNING] Not logged in to Wrangler. Please login:
    wrangler login
    if errorlevel 1 exit /b 1
)

REM Install dependencies
echo [INFO] Installing dependencies...
call npm ci
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)

REM Check and create database
echo [INFO] Checking database configuration...
wrangler d1 list | findstr "htmlshare-db" >nul
if errorlevel 1 (
    echo [INFO] Creating Cloudflare D1 database...
    call wrangler d1 create htmlshare-db
    if errorlevel 1 (
        echo [ERROR] Failed to create database
        exit /b 1
    )
    echo [WARNING] Please update wrangler.toml with the new database ID
    echo [WARNING] Press any key when ready to continue...
    pause >nul
) else (
    echo [SUCCESS] Database already exists
)

REM Apply database schema
echo [INFO] Applying database schema...
call wrangler d1 execute htmlshare-db --file=./schema.sql
if errorlevel 1 (
    echo [ERROR] Failed to apply database schema
    exit /b 1
)

REM Build the project
echo [INFO] Building project...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    exit /b 1
)

REM Deploy to Cloudflare Pages
echo [INFO] Deploying to Cloudflare Pages...
call wrangler pages publish dist
if errorlevel 1 (
    echo [ERROR] Deployment failed
    exit /b 1
)

echo.
echo [SUCCESS] 🎉 Deployment completed!
echo [INFO] Your site should be available at: https://htmlshare.pages.dev
echo.
echo 📋 Next steps:
echo 1. Test your site at https://htmlshare.pages.dev
echo 2. Configure custom domain if needed
echo 3. Monitor performance and usage

pause