import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAdminPassword() {
  console.log('🔐 Updating admin password...\n');

  try {
    // Hash the new password: Vikas@23112005
    const newPassword = 'Vikas@23112005';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    console.log('✅ New password hashed successfully');
    console.log('New hashed password:', hashedPassword);

    // Update the admin user's password
    const { data, error } = await supabase
      .from('collectors')
      .update({ password: hashedPassword })
      .eq('email', 'ramjib2311@gmail.com')
      .select();

    if (error) {
      console.error('❌ Error updating password:', error.message);
      console.log('\n📋 Run this SQL in Supabase SQL Editor:');
      console.log(`
UPDATE public.collectors 
SET password = '${hashedPassword}' 
WHERE email = 'ramjib2311@gmail.com';
      `);
    } else {
      console.log('✅ Admin password updated successfully!');
      console.log('\n📧 New Admin Login Credentials:');
      console.log('   Email: ramjib2311@gmail.com');
      console.log('   Password: Vikas@23112005');
    }

  } catch (error) {
    console.error('❌ Update failed:', error.message);
  }
}

updateAdminPassword();
