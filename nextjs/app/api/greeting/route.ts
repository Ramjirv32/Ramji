import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get country and region from headers provided by Vercel Edge Runtime
  const country = request.headers.get('x-vercel-ip-country') || 'unknown'
  const region = request.headers.get('x-vercel-ip-country-region') || 'unknown'
  const city = request.headers.get('x-vercel-ip-city') || 'unknown'

  let content

  if (country === 'IN') {
    if (region === 'TN' || city.toLowerCase().includes('chennai')) {
      content = { message: 'Vanakkam from Tamil Nadu 🇮🇳!' }
    } else {
      content = { message: `Namaste from India 🇮🇳! You're in ${region}, ${city}.` }
    }
  } else if (country === 'US') {
    content = { message: 'Hello from the United States 🇺🇸!' }
  } else if (country === 'GB') {
    content = { message: 'Hello from the United Kingdom 🇬🇧!' }
  } else {
    content = { message: `Hello from ${country}! 🌍` }
  }

  return Response.json(content, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600',
      'CDN-Cache-Control': 'public, s-maxage=86400',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=86400',
      'Vary': 'X-Vercel-IP-Country, X-Vercel-IP-Country-Region, X-Vercel-IP-City',
    },
  })
}