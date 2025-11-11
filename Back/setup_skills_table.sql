-- Create Skills table for storing skill data
CREATE TABLE IF NOT EXISTS public."Skills" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_skills_name ON public."Skills"(name);

-- Enable Row Level Security (RLS)
ALTER TABLE public."Skills" ENABLE ROW LEVEL SECURITY;

-- Create policies for Skills table
-- Allow public read access (for frontend display)
CREATE POLICY "Allow public read access on Skills" ON public."Skills"
  FOR SELECT 
  USING (true);

-- Allow admin insert access
CREATE POLICY "Allow admin insert on Skills" ON public."Skills"
  FOR INSERT 
  WITH CHECK (true);

-- Allow admin update access  
CREATE POLICY "Allow admin update on Skills" ON public."Skills"
  FOR UPDATE 
  USING (true);

-- Allow admin delete access
CREATE POLICY "Allow admin delete on Skills" ON public."Skills"
  FOR DELETE 
  USING (true);

-- Grant permissions
GRANT ALL ON public."Skills" TO service_role;
GRANT SELECT ON public."Skills" TO anon;
GRANT SELECT ON public."Skills" TO authenticated;

-- Insert some sample skills data
INSERT INTO public."Skills" (name, icon) VALUES
('HTML', 'FaHtml5'),
('CSS', 'FaCss3Alt'), 
('JavaScript', 'FaJsSquare'),
('TypeScript', 'SiTypescript'),
('React', 'FaReact'),
('Next.js', 'SiNextdotjs'),
('Node.js', 'FaNodeJs'),
('Express', 'SiExpress'),
('MongoDB', 'SiMongodb'),
('PostgreSQL', 'SiPostgresql'),
('Python', 'FaPython'),
('Java', 'FaJava'),
('AWS', 'FaAws'),
('Docker', 'FaDocker'),
('Git', 'FaGitAlt')
ON CONFLICT (name) DO NOTHING;