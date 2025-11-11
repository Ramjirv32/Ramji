import { type NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

// Fallback skills data in case database is unavailable
const fallbackSkillsData = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    s: [
      "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "Svelte",
      "Node.js", "Express", "NestJS", "Django", "FastAPI", "Spring Boot", ".NET",
      "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase",
      "Tailwind CSS", "Bootstrap", "Sass", "Material-UI", "Shadcn",
      "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Vercel", "Cloudflare",
      "Python", "Java", "C", "C++", "Rust", "Go", "Kotlin", "Swift", "Dart", "PHP",
      "GraphQL", "REST API", "WebSocket", "Prisma", "Redux", "Three.js", "WebGL", "Framer Motion",
      "Jest", "Cypress", "Webpack", "Vite", "Postman", "Figma", "Nginx", "Jenkins",
      "Flutter", "React Native", "WordPress", "Stripe", "Razorpay"
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    // Get country for personalized greeting
    const country = request.headers.get('x-vercel-ip-country') || 'unknown'
    const region = request.headers.get('x-vercel-ip-country-region') || 'unknown'
    const city = request.headers.get('x-vercel-ip-city') || 'unknown'

    let greeting = "Welcome to my tech stack!"
    
    if (country === 'IN') {
      if (region === 'TN' || city.toLowerCase().includes('chennai')) {
        greeting = "Vanakkam! Here's my tech stack 🇮🇳"
      } else {
        greeting = `Namaste from ${region}! Here's my tech stack 🇮🇳`
      }
    } else if (country === 'US') {
      greeting = "Hello from the United States! Here's my tech stack 🇺🇸"
    } else if (country === 'GB') {
      greeting = "Hello from the United Kingdom! Here's my tech stack 🇬🇧"
    } else if (country !== 'unknown') {
      greeting = `Hello from ${country}! Here's my tech stack 🌍`
    }

    // Since the admin skills API is working, fetch from it internally
    try {
      const adminResponse = await fetch('https://ramji-etht.vercel.app/api/admin/skills')
      
      if (adminResponse.ok) {
        const adminData = await adminResponse.json()
        
        if (adminData && Array.isArray(adminData) && adminData.length > 0) {
          const skillsData = adminData[0]
          const response = {
            ...skillsData,
            greeting,
            location: { country, region, city }
          }

          return Response.json([response], {
            status: 200,
            headers: {
              'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
              'CDN-Cache-Control': 'public, s-maxage=86400',
              'Vercel-CDN-Cache-Control': 'public, s-maxage=86400',
              'Vary': 'X-Vercel-IP-Country, X-Vercel-IP-Country-Region, X-Vercel-IP-City',
            },
          })
        }
      }
    } catch (fetchError) {
      console.log('Failed to fetch from admin route, using fallback:', fetchError)
    }

    // Fallback to static data if admin route fails
    const response = {
      ...fallbackSkillsData[0],
      greeting,
      location: { country, region, city }
    }

    return Response.json([response], {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    })

  } catch (error) {
    console.error('Skills API error:', error)
    
    // Return fallback data in case of any error
    const response = {
      ...fallbackSkillsData[0],
      greeting: "Welcome to my tech stack!",
      location: { country: 'unknown', region: 'unknown', city: 'unknown' }
    }

    return Response.json([response], {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    })
  }
}