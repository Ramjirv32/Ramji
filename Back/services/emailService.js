import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email configuration');
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Send contact form email
 * @param {Object} data - Email data object
 * @param {string} data.name - Sender's name
 * @param {string} data.email - Sender's email
 * @param {string} data.message - Message content
 * @returns {Promise} - Nodemailer response
 */
export const sendContactEmail = async (data) => {
  const { name, email, message } = data;
  
  if (!name || name.trim().length < 2) {
    throw new Error('Please provide a valid name (at least 2 characters)');
  }
  
  if (!email || !isValidEmail(email)) {
    throw new Error('Please provide a valid email address');
  }
  
  if (!message || message.trim().length < 10) {
    throw new Error('Please provide a message (at least 10 characters)');
  }

  const transporter = createTransporter();
  
  if (!transporter) {
    throw new Error('Email service not properly configured');
  }

  const currentDate = new Date().toLocaleString();

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nDate: ${currentDate}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #00BFFF; border-bottom: 2px solid #00BFFF; padding-bottom: 10px;">New Portfolio Contact</h2>
        
        <div style="margin: 20px 0; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <p style="margin: 5px 0;"><strong style="color: #555;">From:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #00BFFF; text-decoration: none;">${email}</a></p>
          <p style="margin: 5px 0;"><strong style="color: #555;">Date:</strong> ${currentDate}</p>
        </div>
        
        <div style="margin: 20px 0; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <h3 style="color: #555; margin-top: 0;">Message:</h3>
          <div style="white-space: pre-line; color: #333; line-height: 1.5;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="font-size: 12px; color: #888; margin-top: 20px; text-align: center;">
          This email was sent from your portfolio contact form.
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};