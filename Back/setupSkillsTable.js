import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Key is not defined in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupSkillsTable() {
  console.log('🚀 Setting up Skills table...\n');

  try {
    console.log('📋 Please run the following SQL in your Supabase SQL Editor:\n');
    console.log(`
-- Create Skills table
CREATE TABLE IF NOT EXISTS public."Skills" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_skills_name ON public."Skills"(name);

-- Enable RLS
ALTER TABLE public."Skills" ENABLE ROW LEVEL SECURITY;

-- Create policies (optional - adjust based on your needs)
CREATE POLICY "Allow public read access" ON public."Skills"
  FOR SELECT USING (true);

CREATE POLICY "Allow admin insert" ON public."Skills"
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin update" ON public."Skills"
  FOR UPDATE USING (true);

CREATE POLICY "Allow admin delete" ON public."Skills"
  FOR DELETE USING (true);
`);

    console.log('\n✅ Copy the SQL above and run it in Supabase SQL Editor');
    console.log('📍 Go to: Supabase Dashboard > SQL Editor > New Query\n');

    // Try to check if table exists
    const { data, error } = await supabase
      .from('Skills')
      .select('*')
      .limit(1);

    if (!error) {
      console.log('✅ Skills table already exists and is accessible!');
      console.log(`📊 Current skills count: ${data?.length || 0}`);
    } else {
      console.log('⚠️  Skills table does not exist yet. Please run the SQL above.');
      console.log(`Error: ${error.message}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

setupSkillsTable();
