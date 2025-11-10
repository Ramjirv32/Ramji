# Smooth Scroll Implementation

## ✅ What's Been Added

Your website now has **smooth scrolling** powered by [Lenis](https://github.com/darkroomengineering/lenis) - the same library used by top-tier websites like Apple and Awwwards winners.

## 📦 Installed Packages

- `lenis` (v1.3.14) - Latest smooth scroll library

## 🗂️ Files Modified/Created

### Created:
1. **`/app/components/SmoothScroll.tsx`** - Main smooth scroll provider component
2. **`/app/components/ExampleScrollUsage.tsx`** - Example of how to use smooth scroll in other components

### Modified:
1. **`/app/layout.tsx`** - Wrapped entire app with `<SmoothScroll>` provider
2. **`/app/page.tsx`** - Added section IDs to all components
3. **`/app/components/Navbar.tsx`** - Updated to use Lenis smooth scroll
4. **`/app/globals.css`** - Added Lenis CSS styles

## 🎯 Features

✅ Buttery smooth scrolling throughout the entire website
✅ Programmatic scrolling from navigation
✅ Easy to use in any component
✅ Optimized performance with requestAnimationFrame
✅ Works perfectly with your existing design
✅ Mobile-friendly (touch support)

## 📍 Section IDs Available

All sections now have IDs you can scroll to:
- `home` - Hero section
- `about` - About section
- `skills` - Skills section
- `projects` - Projects section
- `works` - Works/Experience section
- `certificates` - Certificates section
- `research` - Research section
- `contact` - Contact section

## 🚀 How to Use in Your Components

### Basic Usage:

```tsx
import { useScroll } from "@/app/components/SmoothScroll";

export default function YourComponent() {
  const { handleClick } = useScroll();

  return (
    <button onClick={() => handleClick("about")}>
      Go to About Section
    </button>
  );
}
```

### In the Navbar:
The navbar already uses the smooth scroll! Clicking any navigation item will smoothly scroll to that section.

### Custom Scroll Buttons:
```tsx
<button onClick={() => handleClick("contact")}>
  Contact Me
</button>
```

## ⚙️ Configuration

The smooth scroll is configured in `/app/components/SmoothScroll.tsx` with these settings:

```tsx
{
  duration: 1.2,              // Scroll duration (1.2 seconds)
  easing: (t) => ...,         // Custom easing function
  orientation: "vertical",    // Vertical scrolling
  smoothWheel: true,          // Smooth mouse wheel
  wheelMultiplier: 1,         // Mouse wheel speed
  touchMultiplier: 2,         // Touch scroll speed
  infinite: false             // No infinite scroll
}
```

You can adjust these values if you want faster/slower scrolling!

## 🎨 Lenis CSS Classes

The following CSS classes are now available:
- `.lenis` - Applied to html element
- `.lenis-smooth` - When smooth scroll is active
- `.lenis-stopped` - When scrolling is disabled
- `.lenis-scrolling` - During scroll animation

## 🔧 Troubleshooting

**If scrolling feels too slow/fast:**
- Adjust `duration` in `SmoothScroll.tsx` (lower = faster, higher = slower)
- Adjust `wheelMultiplier` for mouse wheel speed

**If scroll doesn't work:**
- Make sure the section has the correct ID in `page.tsx`
- Check browser console for any errors

## 📱 Mobile Support

The smooth scroll is optimized for mobile devices:
- Touch scrolling works naturally
- No smoothing on touch (prevents lag)
- `touchMultiplier: 2` for comfortable swipe speed

## 🎉 That's It!

Your website now has professional-grade smooth scrolling! Just start your dev server and enjoy the buttery smooth experience.

```bash
pnpm dev
```

Visit http://localhost:3000 and test the navigation!
