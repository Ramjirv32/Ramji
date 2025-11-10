import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Key is not defined in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addSkills() {
  console.log('🚀 Adding skills to database...\n');

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "ReactJS",
    "C",
    "Java",
    "Tailwind CSS",
    "Framer Motion",
    "Shadcn",
    "NodeJS",
    "ExpressJS",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Git",
    "GitHub",
    "Vercel",
    "Postman",
    "Linux",
    "Supabase",
    "NextJS",
    "Python",
    "fastapi",
    "Docker",
    "Cloudflare",
    "WordPress",
    "Figma",
    "Firebase",
    "AWS",
    "Redux",
    "Jenkins",
    "Azure"
  ];

  // Create the skills array in the format expected by the database
  const skillsArray = skills.map(skill => ({
    name: skill,
    icon: `/icons/${skill.toLowerCase().replace(/\s+/g, '-')}.svg`
  }));

  try {
    // Insert as a single row with all skills in the 's' JSON field
    const { data, error } = await supabase
      .from('skills')
      .insert([{ s: skillsArray }])
      .select();

    if (error) {
      console.error('❌ Error inserting skills:', error.message);
      process.exit(1);
    }

    console.log('✅ Successfully added all skills to the database!');
    console.log(`📊 Total skills added: ${skills.length}`);
    console.log('\nSkills added:');
    skills.forEach((skill, index) => {
      console.log(`  ${index + 1}. ${skill}`);
    });
    console.log('\n🎉 Done!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addSkills();
