#!/bin/bash

# Performance Optimization & Deployment Script
# This script helps deploy to Vercel with India region optimization

echo "🚀 Ramji Portfolio - Vercel Deployment Script"
echo "==========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Navigate to nextjs directory
cd nextjs || { echo "❌ nextjs directory not found"; exit 1; }

# Step 1: Clean build
echo "📦 Step 1: Cleaning and building project..."
rm -rf .next
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Exiting."
    exit 1
fi
echo "✅ Build successful!"

# Step 2: Check for uncommitted changes
echo ""
echo "📝 Step 2: Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Commit them first:"
    echo "    git add ."
    echo "    git commit -m 'Performance optimizations and deployment config'"
    exit 1
fi
echo "✅ All changes committed!"

# Step 3: Deploy to Vercel
echo ""
echo "🌐 Step 3: Deploying to Vercel (India regions)..."
echo "  Regions: bom1 (Bombay), maa1 (Chennai)"
echo ""

vercel deploy --prod --regions bom1 maa1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📊 Next steps:"
    echo "  1. Visit https://pagespeed.web.dev"
    echo "  2. Enter your site URL"
    echo "  3. Check LCP (should be < 2.5s)"
    echo "  4. Monitor from India region for best results"
    echo ""
    echo "📈 View deployment logs:"
    echo "  vercel logs --tail"
    echo ""
    echo "📱 Check deployment list:"
    echo "  vercel ls"
else
    echo "❌ Deployment failed. Check the logs above."
    exit 1
fi
