import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ 
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
  credentials: true
}));

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

console.log("✅ Supabase client created successfully");

// Add contact routes
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
    // If a single object is sent, wrap it in an array
    if (!Array.isArray(projects)) projects = [projects];

    // Map fields to match your Supabase schema
    const formatted = projects.map(p => ({
      id: p.id,
      created_at: p.created_at,
      title: p.title,
      p1: p.p1,
      p2: p.p2,
      p3: p.p3,
      p4: p.p4,
      Tech: p.Tech, // Should be an array column in Supabase
      github: p.github,
      livedemo: p.livedemo,
      image: p.image || '/assets/default-project.png' // Add image field with fallback
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

app.get("/skills", async (req, res) => {
  try {
    const { data, error } = await supabase.from("skills").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to add or update skills
app.post("/skills", async (req, res) => {
  try {
    const skillsData = req.body;
    
    // Check if we're updating existing skills or creating new
    const { data: existingSkills } = await supabase
      .from("skills")
      .select("id")
      .limit(1);
    
    let result;
    
    if (existingSkills && existingSkills.length > 0) {
   
      const { data, error } = await supabase
        .from("skills")
        .update({ s: skillsData.skills })
        .eq("id", existingSkills[0].id)
        .select();
      
      if (error) throw error;
      result = data;
    } else {
      
      const { data, error } = await supabase
        .from("skills")
        .insert({ s: skillsData.skills })
        .select();
      
      if (error) throw error;
      result = data;
    }
    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error adding/updating skills in Supabase:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("skills").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use PORT from env or default to 9000
const PORT =  9000;

app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
