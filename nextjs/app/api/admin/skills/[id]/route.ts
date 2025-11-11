import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface RouteContext {
  params: Promise<{ id: string }>
}

// PUT /api/admin/skills/[id] - Update a skill
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
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
      .update({ name, icon })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        )
      }
      
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Skill name already exists' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to update skill', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Skill updated successfully',
        data: [skill]
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/skills/[id] - Delete a skill
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    const { error } = await supabase
      .from('Skills')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to delete skill', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Skill deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}