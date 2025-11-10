-- Create collectors table for admin authentication
CREATE TABLE IF NOT EXISTS public.collectors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_collectors_email ON public.collectors(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.collectors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to do anything
CREATE POLICY "Enable all access for service role" ON public.collectors
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert admin user (password will be hashed: Vikas@231112005)
-- Note: You should run the server to generate the hashed password
-- Or manually hash it and insert here
INSERT INTO public.collectors (email, password, full_name, role)
VALUES (
  'ramjib2311@gmail.com', 
  '$2b$10$YourHashedPasswordHere', -- This will be replaced by server
  'Admin User', 
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Grant permissions
GRANT ALL ON public.collectors TO service_role;
GRANT ALL ON public.collectors TO authenticated;
