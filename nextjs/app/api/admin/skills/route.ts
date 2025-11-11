import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/admin/skills - Fetch all skills
export async function GET() {
  try {
    const { data: skills, error } = await supabase
      .from('Skills')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch skills', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(skills || [], { status: 200 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/skills - Create a new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, icon } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Skill name is required' },
        { status: 400 }
      )
    }

    const { data: skill, error } = await supabase
      .from('Skills')
      .insert([{ name, icon }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      
      // Handle unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Skill already exists' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to create skill', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Skill created successfully', 
        data: [skill]
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}