#!/bin/bash

# Image Compression Helper Script
# This script helps you compress the large hero image

echo "🖼️  Image Compression Helper"
echo "=============================="
echo ""

# Check if sharp-cli is installed
if ! command -v sharp &> /dev/null; then
    echo "📦 Sharp CLI is not installed."
    echo ""
    echo "Do you want to install it? (y/n)"
    read -r response
    if [[ "$response" == "y" ]]; then
        echo "Installing sharp-cli globally..."
        npm install -g sharp-cli
    else
        echo ""
        echo "No problem! Use one of these alternatives:"
        echo ""
        echo "🌐 Option 1: TinyPNG (Online, No Installation)"
        echo "   1. Visit: https://tinypng.com/"
        echo "   2. Upload: public/h/j1.webp"
        echo "   3. Download and replace"
        echo ""
        echo "🌐 Option 2: Squoosh (Online, No Installation)"
        echo "   1. Visit: https://squoosh.app/"
        echo "   2. Upload: public/h/j1.webp"
        echo "   3. Download and replace"
        echo ""
        exit 0
    fi
fi

# Check if the image exists
if [ ! -f "public/h/j1.webp" ]; then
    echo "❌ Error: public/h/j1.webp not found!"
    echo "   Make sure you're running this from the nextjs directory"
    exit 1
fi

echo ""
echo "📸 Found j1.webp"
echo "Current size: $(du -h public/h/j1.webp | cut -f1)"
echo ""
echo "🔄 Compressing image..."
echo "   - Resizing to 512x512 (perfect for circular avatar)"
echo "   - Quality: 85%"
echo "   - Format: WebP"
echo ""

# Create backup
cp public/h/j1.webp public/h/j1-backup.webp
echo "✅ Created backup: public/h/j1-backup.webp"

# Compress image
sharp -i public/h/j1.webp -o public/h/j1-compressed.webp --webp --quality 85 --resize 512

if [ $? -eq 0 ]; then
    # Replace original with compressed
    mv public/h/j1-compressed.webp public/h/j1.webp
    
    echo ""
    echo "✨ SUCCESS!"
    echo ""
    echo "📊 Results:"
    echo "   Old size: $(du -h public/h/j1-backup.webp | cut -f1)"
    echo "   New size: $(du -h public/h/j1.webp | cut -f1)"
    echo ""
    echo "🎉 Your hero image is now optimized!"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Run: npm run build"
    echo "   2. Test the site: npm start"
    echo "   3. Deploy: git push && vercel --prod"
    echo ""
    echo "💡 If you want to restore the original:"
    echo "   mv public/h/j1-backup.webp public/h/j1.webp"
else
    echo ""
    echo "❌ Compression failed!"
    echo ""
    echo "Try one of these alternatives:"
    echo "🌐 TinyPNG: https://tinypng.com/"
    echo "🌐 Squoosh: https://squoosh.app/"
fi
