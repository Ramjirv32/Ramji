# 🚀 Ramji B - Portfolio

A modern, responsive, and beautifully designed portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** animations.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features
a
- 🎨 **Modern Design** - Clean and professional UI with smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **High Performance** - Built with Next.js 15 for optimal speed and SEO
- 🎭 **Beautiful Animations** - Framer Motion and custom CSS animations
- 🌙 **Dark Mode Support** - Theme provider with light/dark toggle
- 📧 **Contact Form** - Email integration with Resend
- 🎯 **SEO Optimized** - Metadata, Open Graph, and Twitter cards
- 🔄 **Smooth Scrolling** - Custom Lenis scroll integration
- 📦 **Component Library** - Reusable UI components from Aceternity UI
- 🎬 **Project Showcase** - Dynamic projects section with filtering
- 📜 **Skills & Experience** - Comprehensive skills and work experience
- 🎓 **Certifications** - Display of professional certifications

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS Modules
- **Animations**: Framer Motion
- **UI Components**: Aceternity UI, Shadcn/ui
- **Smooth Scrolling**: Lenis
- **Icons**: Custom SVG & Icon Libraries

### Backend
- **Email Service**: Resend API
- **API Routes**: Next.js API routes

### Deployment
- **Hosting**: Vercel (optimized for free tier)
- **Build Tool**: pnpm

## 📁 Project Structure

```
nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # Reusable components
│   │   ├── header/            # Navigation header
│   │   ├── footer/            # Footer section
│   │   ├── sections/          # Page sections
│   │   ├── ui/                # UI components
│   │   └── ...
│   ├── data/                  # Configuration & constants
│   │   ├── config.ts          # Site config
│   │   ├── constants.ts       # Constants
│   │   └── projects.tsx       # Projects data
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   │   └── lenis/             # Smooth scroll library
│   └── types/                 # TypeScript types
├── public/                    # Static assets
│   ├── assets/               # Images & videos
│   ├── com/                  # Company/Resume files
│   └── personal/             # Personal assets
├── vercel.json              # Vercel deployment config
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ or **Bun**
- **pnpm** (recommended for faster installs)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ramjirv32/Ramji.git
cd Ramji/nextjs
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key_here
```

4. **Run the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📝 Configuration

Edit `src/data/config.ts` to customize:

```typescript
const config = {
  title: "Ramji B",
  description: { ... },
  keywords: [ ... ],
  author: "Ramji B",
  email: "ramjib2311@gmail.com",
  site: "https://your-domain.com",
  social: { ... }
}
```

## 🎨 Customization

### Colors & Theme
- Tailwind CSS configuration in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- Component-specific styles in SCSS modules

### Content
- **Projects**: Edit `src/data/projects.tsx`
- **Skills**: Edit `src/components/sections/skills.tsx`
- **Experience**: Edit `src/components/sections/works.tsx`
- **Certifications**: Edit `src/components/sections/certifications.tsx`

### Components
- Reusable components in `src/components/ui/`
- Section components in `src/components/sections/`
- Custom hooks in `src/hooks/`

## 📧 Email Integration

This portfolio uses **Resend** for email notifications. To set up:

1. Get your API key from [Resend](https://resend.com)
2. Add to `.env.local`:
```
RESEND_API_KEY=your_key_here
```
3. Update email configuration in `src/app/api/send/route.ts`

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

The project is optimized for Vercel's free tier with:
- ✅ Optimized caching headers
- ✅ 10-second function timeout
- ✅ Image optimization
- ✅ Edge caching for static assets

### Environment Variables
Set these in Vercel project settings:
```
RESEND_API_KEY=your_key
NEXT_PUBLIC_SITE_URL=your_production_url
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance)
- **Core Web Vitals**: Optimized
- **Bundle Size**: ~50KB gzipped (initial)
- **First Contentful Paint**: <1.5s

Optimizations include:
- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind
- Code splitting and lazy loading
- Minified production builds
- Aggressive caching headers

## 🔍 SEO

- Metadata with OpenGraph tags
- Twitter card integration
- Sitemap support
- Robots.txt configuration
- Schema markup ready

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Resend](https://resend.com/)

## 📄 Available Scripts

```bash
# Development
pnpm dev          # Start dev server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Linting & Formatting
pnpm lint         # Run ESLint
pnpm format       # Format code (if configured)
```

## 🐛 Known Issues

None currently. Please report any issues on [GitHub Issues](https://github.com/Ramjirv32/Ramji/issues).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 👤 Author

**Ramji B**
- 📧 Email: [ramjib2311@gmail.com](mailto:ramjib2311@gmail.com)
- 🌐 Website: [ramjiport.com](https://ramjiport.com)
- 💼 LinkedIn: [linkedin.com/in/ramji](https://linkedin.com/in/ramji)
- 🐙 GitHub: [@Ramjirv32](https://github.com/Ramjirv32)
- 💻 LeetCode: [RAMJI____B](https://leetcode.com/u/RAMJI____B/)

## 🙏 Acknowledgments

- [Aceternity UI](https://aceternity.com/) - Beautiful UI components
- [Shadcn/ui](https://ui.shadcn.com/) - Accessible component library
- [Vercel](https://vercel.com/) - Hosting & deployment
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

**Made with ❤️ by Ramji B**
