import express from 'express';
import { sendContactEmail } from '../services/emailService.js';

const router = express.Router();

const ipRequests = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  if (ipRequests.has(ip)) {
    ipRequests.get(ip).requests = ipRequests.get(ip).requests.filter(
      time => now - time < 3600000
    );
  }
  
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, { requests: [] });
  }
  
  const requests = ipRequests.get(ip).requests;
  
  if (requests.length >= 5) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please try again later.'
    });
  }
  
  requests.push(now);
  
  next();
};


router.post('/', rateLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
 
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide name, email, and message' 
      });
    }
    
   
    if (message.includes('http') || message.toLowerCase().includes('viagra') || message.toLowerCase().includes('casino')) {
      return res.status(400).json({
        success: false,
        error: 'Message contains prohibited content'
      });
    }

    await sendContactEmail({ name, email, message });
    
   
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully! I\'ll get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error.message);
    
  
    if (error.message.includes('email') || error.message.includes('valid')) {
      return res.status(400).json({ success: false, error: error.message });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send your message. Please try again later.' 
    });
  }
});

export default router;