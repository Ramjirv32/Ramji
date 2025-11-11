import { type NextRequest } from 'next/server'

// Fallback skills data in case backend is unavailable
const fallbackSkillsData = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    s: [
      "HTML",
      "CSS", 
      "JavaScript",
      "TypeScript",
      "ReactJS",
      "C",
      "Java",
      "Tailwind CSS",
      "Framer Motion", 
      "Shadcn",
      "NodeJS",
      "ExpressJS",
      "MongoDB",
      "PostgreSQL", 
      "Prisma",
      "Git",
      "GitHub",
      "Vercel",
      "Postman",
      "Linux",
      "Supabase",
      "NextJS",
      "Python",
      "fastapi",
      "Docker",
      "Cloudflare",
      "WordPress",
      "Figma",
      "Firebase",
      "AWS",
      "Redux",
      "Jenkins",
      "Azure"
    ]
  }
];

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

    // Try to fetch from your backend server's public skills route
    try {
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:9000'
      const backendResponse = await fetch(`${backendUrl}/public/skills`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (backendResponse.ok) {
        const backendData = await backendResponse.json()
        
        if (backendData && Array.isArray(backendData) && backendData.length > 0) {
          const skillsData = backendData[0]
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
      console.log('Failed to fetch from backend server, using fallback:', fetchError)
    }

    // Fallback to static data if backend route fails
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
    console.error('Public Skills API error:', error)
    
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