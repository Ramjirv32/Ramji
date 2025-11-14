# Ramji's Portfolio WebsiteThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A modern, fully responsive portfolio website built with Next.js 16, featuring smooth scrolling, dynamic animations, and performance optimizations.## Getting Started



## 🌟 FeaturesFirst, run the development server:



- **Modern Design** - Clean and professional UI with purple theme```bash

- **Smooth Scrolling** - Custom Lenis smooth scroll implementationnpm run dev

- **Responsive Design** - Mobile, tablet, and desktop optimized# or

- **Performance Optimized** - LCP optimization, image caching, and CDN integrationyarn dev

- **Dynamic Sections**:# or

  - Hero section with animated technologiespnpm dev

  - About section with CV download# or

  - Skills showcase with category groupingbun dev

  - Projects timeline with detailed descriptions```

  - Work experience and freelance projects

  - Certifications & credentials carouselOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

  - Research publications

  - Contact form with validationYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **SEO Friendly** - Meta tags, Open Graph support

- **Fast Deployment** - Vercel deployment with Singapore region (sin1)This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



## 🚀 Tech Stack## Learn More



- **Frontend Framework**: Next.js 16.0.1 with App Router & TurbopackTo learn more about Next.js, take a look at the following resources:

- **Styling**: Tailwind CSS

- **Animations**: Framer Motion, AOS (Animate on Scroll)- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **UI Components**: React Icons- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **Smooth Scroll**: Custom Lenis implementation

- **Database**: SupabaseYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- **Deployment**: Vercel

## Deploy on Vercel

## 📋 Prerequisites

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- Node.js 18+ or higher

- pnpm package manager (recommended)Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Ramji-nextjsportfolio

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nextjs
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Create environment variables**
```bash
cp .env.example .env.local
```

Add your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

4. **Run development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
nextjs/
├── app/
│   ├── api/                 # API routes
│   ├── components/          # React components
│   │   ├── Hero.tsx        # Landing section
│   │   ├── About.tsx       # About section
│   │   ├── Skills.tsx      # Skills section
│   │   ├── Projects.tsx    # Projects timeline
│   │   ├── Works.tsx       # Work experience
│   │   ├── Certificate.tsx # Certifications
│   │   ├── Research.tsx    # Research/Publications
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Navbar.tsx      # Navigation
│   │   └── SmoothScroll.tsx# Scroll provider
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/                 # Static assets
├── vercel.json            # Vercel deployment config
├── next.config.ts         # Next.js configuration
└── package.json           # Dependencies
```

## 🎨 Customization

### Colors
Main color scheme uses purple theme:
- `#8B5CF6` - Purple-500 (main accent)
- `#7C3AED` - Purple-600 (secondary accent)
- `#6D28D9` - Purple-700 (dark accent)

Update colors in `app/globals.css` and component files.

### Content Updates
- **Hero** → `app/components/Hero.tsx`
- **About** → `app/components/About.tsx`
- **Skills** → `app/components/Skills.tsx`
- **Projects** → `app/components/Projects.tsx`
- **Work** → `app/components/Works.tsx`
- **Certifications** → `app/components/Certificate.tsx`
- **Research** → `app/components/Research.tsx`

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

Configured for Singapore region (sin1) for optimal Asia performance.

### Build for Production

```bash
pnpm run build
pnpm start
```

## ⚡ Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Caching Strategy**: Static assets (1 year), images (7 days), HTML (1 hour)
- **LCP Optimization**: Hero image with `fetchPriority="high"`
- **Smooth Scrolling**: Custom Lenis implementation
- **Code Splitting**: Automatic Next.js App Router splitting

## 🔧 Available Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All sections fully responsive with touch-friendly interactions.

## 🔐 Security

- Environment variables for sensitive data
- Form validation and sanitization
- No hardcoded credentials
- CORS headers configuration

## 🐛 Troubleshooting

### Build Issues
```bash
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Deployment Errors
- Verify environment variables in Vercel dashboard
- Check Node.js version (18+)
- Review Vercel logs for specific errors

### Navbar Not Updating on Scroll
- Clear browser cache
- Verify section IDs in HTML match navbar configuration
- Check if SmoothScroll component is properly mounted

## 📧 Contact

For inquiries or opportunities, reach out through the contact section.

---

**Last Updated**: November 2025  
**Deployed On**: Vercel (sin1 region)  
**Version**: 2.0 (Purple Theme)
