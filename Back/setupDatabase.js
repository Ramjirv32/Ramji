import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Key is not defined in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Setting up database...\n');

  try {
    // Create the collectors table using SQL
    console.log('📋 Creating collectors table...');
    
    const { error: createTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.collectors (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_collectors_email ON public.collectors(email);
        
        ALTER TABLE public.collectors ENABLE ROW LEVEL SECURITY;
      `
    });

    if (createTableError) {
      console.log('⚠️  Could not create table via RPC. Please create manually in Supabase SQL Editor.');
      console.log('\nRun this SQL in your Supabase SQL Editor:');
      console.log(`
CREATE TABLE IF NOT EXISTS public.collectors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_collectors_email ON public.collectors(email);

ALTER TABLE public.collectors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for service role" ON public.collectors
  FOR ALL
  USING (true)
  WITH CHECK (true);
      `);
    } else {
      console.log('✅ Table created successfully');
    }

    // Hash the admin password
    console.log('\n🔐 Hashing admin password...');
    const hashedPassword = await bcrypt.hash('Vikas@231112005', 10);
    console.log('✅ Password hashed successfully');

    // Insert admin user
    console.log('\n👤 Creating admin user...');
    const { data, error } = await supabase
      .from('collectors')
      .upsert([
        {
          email: 'ramjib2311@gmail.com',
          password: hashedPassword,
          full_name: 'Admin User',
          role: 'admin'
        }
      ], { onConflict: 'email' })
      .select();

    if (error) {
      console.error('❌ Error creating admin user:', error.message);
      console.log('\n📋 Manual SQL to insert admin user:');
      console.log(`
INSERT INTO public.collectors (email, password, full_name, role)
VALUES ('ramjib2311@gmail.com', '${hashedPassword}', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;
      `);
    } else {
      console.log('✅ Admin user created successfully!');
      console.log('\n📧 Admin Login Credentials:');
      console.log('   Email: ramjib2311@gmail.com');
      console.log('   Password: Vikas@231112005');
    }

    console.log('\n✅ Database setup complete!\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
