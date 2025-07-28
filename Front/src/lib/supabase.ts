import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Example usage functions
export const projectService = {
  // Get all projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get project by ID
  async getProject(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new project
  async createProject(project: {
    title: string
    description: string
    skills: string[]
    user_id?: string
  }) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update project
  async updateProject(id: string, updates: {
    title?: string
    description?: string
    skills?: string[]
  }) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Delete project
  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Auth helper functions
export const authService = {
  // Sign up
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
    return data
  },

  // Sign in
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Listen to auth changes
  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null)
    })
  }
}

// TypeScript types for your data
export type Project = {
  id: string
  title: string
  description: string
  skills: string[]
  user_id?: string
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

// Database types (auto-generated after running prisma generate)
export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          userId: string
          title: string
          description: string
          skills: string[]
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          userId: string
          title: string
          description: string
          skills: string[]
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          userId?: string
          title?: string
          description?: string
          skills?: string[]
          createdAt?: string
          updatedAt?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
    }
  }
}