import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const { email } = req.body;
  if (email !== 'ramjib2311@gmail.com') {
    return res.status(403).json({ message: 'Unauthorized: Admin access only' });
  }
  next();
};

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get single project
router.get('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('Projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Create project
router.post('/projects', async (req, res) => {
  try {
    const projectData = req.body;
    
    const { data, error } = await supabase
      .from('Projects')
      .insert([projectData])
      .select();
    
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    
    const { data, error } = await supabase
      .from('Projects')
      .update(projectData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('Projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      // Return empty array if table doesn't exist
      return res.json([]);
    }
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.json([]); // Return empty array instead of error
  }
});

// Delete contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all skills
router.get('/skills', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      // Return empty array if table doesn't exist
      return res.json([]);
    }
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching skills:', error.message);
    res.json([]); // Return empty array instead of error
  }
});

// Create skill
router.post('/skills', async (req, res) => {
  try {
    const { s } = req.body;
    
    const { data, error } = await supabase
      .from('skills')
      .insert([{ s }])
      .select();
    
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Error creating skill:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update skill
router.put('/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { s } = req.body;
    
    const { data, error } = await supabase
      .from('skills')
      .update({ s })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating skill:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete skill
router.delete('/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
