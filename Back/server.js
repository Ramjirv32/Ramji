import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();
// const PORT = process.env.PORT || 9000;

// Update CORS configuration to allow requests from your frontend domain
app.use(cors({ 
  origin: [
    'http://localhost:5173',  // Local development frontend
    'http://localhost:3000',  // Another common local development port
    'https://your-frontend-domain.com', // Your production frontend domain
    'https://ramji-portfolio.vercel.app', // Add your actual frontend domain
    process.env.FRONTEND_URL // Optional: Configure this in your environment variables
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
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

// Add a dedicated skills route
app.get('/skills', async (req, res) => {
  try {
    const { data, error } = await supabase.from("Skills").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching skills from Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Also create an alias at /api/skills for consistency
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

const PORT =  9000;

app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
