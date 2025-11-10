import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ramji-b.in',
    'https://ramjimainport.vercel.app/',
    process.env.FRONTEND_URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is not defined in environment variables');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize admin user
const initializeAdminUser = async () => {
  try {
    // Check if collectors table exists
    const { data: existingAdmins, error: adminCheckError } = await supabase
      .from('collectors')
      .select('*')
      .eq('email', 'ramjib2311@gmail.com')
      .limit(1);
    
    if (adminCheckError) {
      if (adminCheckError.message.includes('does not exist')) {
        console.log('⚠️  Table "collectors" does not exist.');
        console.log('📋 Please create the table in Supabase with the following SQL:');
        console.log(`
CREATE TABLE IF NOT EXISTS public.collectors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin user
INSERT INTO public.collectors (email, password, full_name, role)
VALUES ('ramjib2311@gmail.com', '${await bcrypt.hash('Vikas@231112005', 10)}', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;
        `);
        return;
      }
      console.error('Error checking for admin user:', adminCheckError.message);
      return;
    }
    
    // If admin doesn't exist, create it
    if (!existingAdmins || existingAdmins.length === 0) {
      const hashedPassword = await bcrypt.hash('Vikas@231112005', 10);
      const { error: insertError } = await supabase
        .from('collectors')
        .insert([
          {
            email: 'ramjib2311@gmail.com',
            password: hashedPassword,
            full_name: 'Admin User',
            role: 'admin',
            created_at: new Date().toISOString()
          }
        ]);
      
      if (insertError) {
        console.error('Error creating admin user:', insertError.message);
      } else {
        console.log('✅ Admin user created successfully');
      }
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error.message);
  }
};

// Initialize admin user on server start
initializeAdminUser();

app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Authentication routes
app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, fullName, role = 'user' } = req.body;
    
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Email, password, and full name are required' });
    }
    
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('collectors')
      .select('*')
      .eq('email', email)
      .limit(1);
    
    if (checkError) {
      throw new Error('Error checking user existence');
    }
    
    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    const { data, error } = await supabase
      .from('collectors')
      .insert([
        {
          email,
          password: hashedPassword,
          full_name: fullName,
          role,
          created_at: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) {
      throw new Error(error.message);
    }
    
    res.status(201).json({ 
      message: 'User created successfully',
      userId: data[0].id
    });
    
  } catch (error) {
    console.error('Error in signup:', error.message);
    res.status(500).json({ message: error.message || 'Error creating user' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, passwordLength: password?.length });
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // For admin, check if plain password matches first (for convenience)
    if (email === 'ramjib2311@gmail.com' && password === 'Vikas@23112005') {
      console.log('Admin login successful with plain password');
      const { data: adminUser } = await supabase
        .from('collectors')
        .select('id, role')
        .eq('email', email)
        .limit(1);
      
      return res.status(200).json({ 
        message: 'Admin login successful',
        userId: adminUser?.[0]?.id || 'admin',
        role: 'admin',
        email: email
      });
    }
    
    console.log('Checking database for user...');
    
    // Check in database for all users (including admin with hashed password)
    const { data: user, error } = await supabase
      .from('collectors')
      .select('*')
      .eq('email', email)
      .limit(1);
    
    if (error || !user || user.length === 0) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('User found, comparing password...');
    
    // Compare password with hashed password in database
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    
    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('Login successful for user:', user[0].email);
    res.status(200).json({ 
      message: 'Login successful',
      userId: user[0].id,
      role: user[0].role,
      email: user[0].email
    });
    
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

// User profile route
app.get('/auth/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: user, error } = await supabase
      .from('collectors')
      .select('id, email, full_name, role, created_at')
      .eq('id', id)
      .limit(1);
    
    if (error || !user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user[0]);
    
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: error.message || 'Error fetching user data' });
  }
});

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/demo", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Projects").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/demo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("Demo")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/demo", async (req, res) => {
  try {
    let projects = req.body;
 
    if (!Array.isArray(projects)) projects = [projects];
   
    const formatted = projects.map(p => ({
      id: p.id,
      created_at: p.created_at,
      title: p.title,
      p1: p.p1,
      p2: p.p2,
      p3: p.p3,
      p4: p.p4,
      Tech: p.Tech, 
      github: p.github,
      livedemo: p.livedemo,
      image: p.image || '/assets/default-project.png' 
    }));

    const { data, error } = await supabase
      .from("Projects")
      .insert(formatted)
      .select();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error inserting data into Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/skills', async (req, res) => {
  try {
    const { data, error } = await supabase.from("skills").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching skills from Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/skills', async (req, res) => {
  try {
    const { skills } = req.body;
    
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: "Skills must be provided as an array" });
    }
    
    const { data, error } = await supabase
      .from("skills")
      .update({ s: skills })
      .eq('id', 1)
      .select();
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error updating skills in Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const { data, error } = await supabase.from("Skills").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching skills from Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
