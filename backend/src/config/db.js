import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import HeroContent from '../models/HeroContent.js';
import CoreValues from '../models/CoreValues.js';
import HowItWorks from '../models/HowItWorks.js';
import WhyChoose from '../models/WhyChoose.js';
import ContactCTA from '../models/ContactCTA.js';
import ContactPage from '../models/ContactPage.js';
import AboutPage from '../models/AboutPage.js';
import ContactInfo from '../models/ContactInfo.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saffpol';

export const initDb = async () => {
  try {
    console.log(`[DB] Connecting to MongoDB / MongoDB Atlas at ${MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')} ...`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('[DB] MongoDB Connection established successfully.');

    // Seed Initial Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@saffpol.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'AdminPass2026!';

    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(adminPass, salt);
      await User.create({
        email: adminEmail.toLowerCase(),
        password_hash,
        name: 'SaffPol Admin',
        role: 'admin'
      });
      console.log(`[DB Seed] Initial admin user created: ${adminEmail}`);
    }

    // Seed Initial Hero Content
    const existingHero = await HeroContent.findOne();
    if (!existingHero) {
      await HeroContent.create({
        welcome_title: 'Welcome to',
        company_name: 'Saffpoll',
        subtitle: 'EXPERT BUILDING CONTRACTOR SERVICES',
        slides: [
          'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90',
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2400&q=90',
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90'
        ],
        pills: [
          { title: 'New Delhi', icon: 'Building2' },
          { title: 'Residential Construction', icon: 'HardHat' },
          { title: 'Commercial Projects', icon: 'Factory' },
          { title: 'Renovation & Extensions', icon: 'MapPin' },
          { title: 'Delhi NCR', icon: 'Flag' }
        ]
      });
      console.log('[DB Seed] Initial Hero Section content created.');
    }

    // Seed Initial Core Values
    const existingCoreValues = await CoreValues.findOne();
    if (!existingCoreValues) {
      await CoreValues.create({
        label: 'What Drives Us',
        title: 'OUR CORE VALUES',
        description: 'We build every project on clear principles that guide how we plan, communicate, and deliver.',
        bg_image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85',
        btn_text: 'Learn more about our approach',
        btn_link: '#about',
        items: [
          {
            icon: 'Handshake',
            title: 'Lasting Relationships',
            description: 'We prioritize building strong, long-term partnerships with clients, stakeholders, and communities through trust and mutual respect.'
          },
          {
            icon: 'ShieldCheck',
            title: 'Professional Work Ethic',
            description: 'Every team member upholds the highest standards of professionalism, integrity, and accountability in everything we do.'
          },
          {
            icon: 'Users',
            title: 'Teamwork',
            description: 'Collaboration across all levels—from architects to on-site crews—ensures seamless execution and innovative solutions.'
          },
          {
            icon: 'MessageSquare',
            title: 'Transparent Communication',
            description: 'Open dialogue and regular updates keep everyone informed, aligned, and confident throughout the project lifecycle.'
          },
          {
            icon: 'HardHat',
            title: 'Safety First',
            description: 'We maintain rigorous safety protocols and training programs to protect every person on site, every single day.'
          },
          {
            icon: 'Lightbulb',
            title: 'Innovation & Efficiency',
            description: 'We embrace modern techniques, sustainable practices, and smart technologies to deliver projects faster and better.'
          }
        ]
      });
      console.log('[DB Seed] Initial Core Values content created.');
    }

    // Seed Initial How It Works
    const existingHowItWorks = await HowItWorks.findOne();
    if (!existingHowItWorks) {
      await HowItWorks.create({
        title: 'How Saffpoll Works',
        subtitle: "From initial assessment to final handover, here's exactly how we plan, develop, and deliver every project.",
        bottom_text: 'We understand land development, follow approvals, deliver quality roads & infrastructure, and remain reliable throughout the process.',
        bottom_subtext: "We're with you at every step, ensuring transparency and quality.",
        steps: [
          {
            number: '01',
            title: 'Land Assessment',
            icon: 'Search',
            description: "We conduct a detailed land assessment including location analysis, soil testing, survey, access roads, zoning regulations, and feasibility studies to ensure the project's success.",
            points: ['Land survey & measurements', 'Soil and terrain study', 'Legal and zoning review', 'Market feasibility']
          },
          {
            number: '02',
            title: 'Planning & Design',
            icon: 'ClipboardList',
            description: 'Our expert planning team designs approved layouts that include well-planned plots, internal roads, drainage systems, open spaces, amenities, and future expansion considerations.',
            points: ['Plot division & layout design', 'Road width & network planning', 'Parks, open areas & amenities', 'Government layout approvals']
          },
          {
            number: '03',
            title: 'Construction & Infrastructure',
            icon: 'Wrench',
            description: 'We execute complete civil and infrastructure works using quality materials, skilled manpower, and modern equipment to create durable and value-driven developments.',
            points: ['Earthwork & leveling', 'BT / CC roads', 'Underground drainage & stormwater', 'Water pipelines & overhead tanks', 'Electrical lines & street lighting', 'Compound walls & entrance gates']
          },
          {
            number: '04',
            title: 'Final Handover',
            icon: 'CircleCheck',
            description: 'After completing all infrastructure works, we ensure quality checks, final approvals, and smooth handover of the developed venture to landowners or clients.',
            points: ['Final inspections & quality checks', 'Approval coordination', 'Plot marking & documentation', 'Project handover']
          }
        ]
      });
      console.log('[DB Seed] Initial How It Works content created.');
    }

    // Seed Initial Why Choose Saffpoll
    const existingWhyChoose = await WhyChoose.findOne();
    if (!existingWhyChoose) {
      await WhyChoose.create({
        tag: 'Why Saffpoll',
        title: 'Why Choose Saffpoll',
        description: 'Experience, quality, transparency and a commitment to delivering construction projects that create lasting value.',
        cards: [
          {
            id: 'card_exp',
            enabled: true,
            type: 'experience',
            badge: '01',
            tag: 'Experience',
            title: 'Our Experience',
            description: 'With over 20 years of experience in the building industry, Saffpoll has established itself as a reliable and trusted contractor.',
            image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=90'
          },
          {
            id: 'card_quality',
            enabled: true,
            type: 'quality',
            icon: 'ShieldCheck',
            tag: 'Quality',
            title: 'Our Commitment to Quality',
            description: 'At Saffpoll, we are committed to delivering high-quality workmanship on every project.',
            image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=90'
          }
        ],
        stats: [
          { id: 'stat_exp', enabled: true, tag: 'Experience', stat: '20+', unit: 'Years', subtext: 'Building since 1998' }
        ],
        bottom_values: [
          { id: 'val_1', enabled: true, icon: 'Award', title: 'Personalized Service', description: 'Service tailored to your unique needs.' }
        ]
      });
      console.log('[DB Seed] Initial Why Choose Saffpoll content created.');
    }

    // Seed Initial Contact CTA
    const existingContactCTA = await ContactCTA.findOne();
    if (!existingContactCTA) {
      await ContactCTA.create({
        enabled: true,
        tag: "Let's Build Together",
        title: 'Plan your next project with Saffpoll',
        description: "Have a residential, commercial, renovation, or construction requirement? Talk directly with our team and let's discuss how we can bring your vision to life.",
        bg_image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80',
        buttons: [
          { id: 'btn_call', enabled: true, text: 'Call Now: +91 98104 64083', link: 'tel:+919810464083', style: 'outline', icon: 'Phone' }
        ],
        contact_details: [
          { id: 'detail_1', enabled: true, text: '+91 98104 64083' },
          { id: 'detail_2', enabled: true, text: 'firoz@saffpoll.com' }
        ]
      });
      console.log('[DB Seed] Initial Contact CTA content created.');
    }

    // Seed Initial Contact Page
    const existingContactPage = await ContactPage.findOne();
    if (!existingContactPage) {
      await ContactPage.create({
        hero: {
          enabled: true,
          tag: 'Get In Touch',
          title: "Let's Build Something Together",
          subtitle: "Whether you're planning a new project or have questions about our services, we're here to understand your requirements and help you take the next step.",
          bg_image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90',
          buttons: [
            { id: 'btn_1', enabled: true, text: 'Send Us a Message', link: '#contact-form', style: 'filled', icon: 'ArrowUpRight' }
          ]
        },
        contact_cards: [
          { id: 'card_phone', enabled: true, icon: 'Phone', label: 'Phone', lines: ['+91 98104 64083', '+91 85959 64083'], href: 'tel:+919810464083' },
          { id: 'card_email', enabled: true, icon: 'Mail', label: 'Email', lines: ['firoz@saffpoll.com'], href: 'mailto:firoz@saffpoll.com' }
        ]
      });
      console.log('[DB Seed] Initial Contact Page content created.');
    }

    // Seed Initial About Page
    const existingAboutPage = await AboutPage.findOne();
    if (!existingAboutPage) {
      await AboutPage.create({
        hero: {
          enabled: true,
          badge1: 'About Saffpoll',
          badge2: '20+ Years Experience',
          title_line1: 'Building with',
          title_highlight1: 'experience.',
          title_line2: 'Delivering with',
          title_highlight2: 'purpose.',
          description: 'Saffpoll is a trusted building contractor with more than 20 years of experience delivering residential, commercial, renovation and construction solutions.',
          btn1_text: 'Our Story',
          btn1_link: '#our-story',
          btn2_text: 'Why Saffpoll',
          btn2_link: '#why-saffpoll',
          hero_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85',
          exp_card_label: 'Experience',
          exp_card_value: '20+',
          exp_card_subtext: 'Years of Experience',
          pills: [
            { id: 'p1', enabled: true, icon: 'Building2', label: 'Residential' },
            { id: 'p2', enabled: true, icon: 'Wrench', label: 'Commercial' },
            { id: 'p3', enabled: true, icon: 'Ruler', label: 'Renovation' }
          ]
        },
        story: {
          enabled: true,
          section_label: 'Our Story',
          section_title: 'Our Journey Since 1998',
          section_description: 'From a small beginning to a trusted building contractor, Saffpoll has grown through experience, quality workmanship and long-term client relationships.',
          timeline: [
            {
              id: 'st_1998',
              enabled: true,
              year_tag: '1998',
              title: 'The Beginning',
              description: 'Saffpoll began with a clear purpose: to provide dependable construction solutions built on workmanship, quality materials and professional execution.',
              image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=85'
            },
            {
              id: 'st_exp',
              enabled: true,
              year_tag: 'EXPERIENCE',
              title: 'Growing Through Experience',
              description: 'Over the years, our capabilities have expanded across residential construction, commercial projects, renovation and extensions.',
              image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85'
            },
            {
              id: 'st_today',
              enabled: true,
              year_tag: 'TODAY',
              title: 'A Trusted Building Partner',
              description: 'Today, Saffpoll combines experienced professionals, modern techniques and a client-focused approach to deliver projects with attention to quality.',
              image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85'
            }
          ]
        },
        mission: {
          enabled: true,
          tag: 'Our Mission',
          title: 'Quality Work.\nClear Communication.\nReliable Delivery.',
          description: "Our goal is to understand every client's vision, execute with care, maintain quality throughout the project and deliver work that meets expectations.",
          bg_image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=2200&q=85'
        },
        people: {
          enabled: true,
          section_label: 'Our People',
          section_title: 'The People Behind Saffpoll',
          section_description: 'Experienced professionals working together to plan, coordinate and deliver construction projects with care.',
          image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=85',
          highlight_title: 'Experienced people.\nOne shared standard.',
          highlight_description: 'Saffpoll works with a team of architects, designers, builders and project managers who bring practical experience to every stage of construction.',
          cards: [
            { id: 'pp_1', enabled: true, icon: 'Users', title: 'Experienced Professionals', description: 'Skilled architects, engineers and managers who guide projects from concept to completion.' },
            { id: 'pp_2', enabled: true, icon: 'HardHat', title: 'Skilled Execution', description: 'On-site teams dedicated to maintaining construction quality, safety standards and precise execution.' }
          ]
        }
      });
      console.log('[DB Seed] Initial About Page content created.');
    }

    // Seed Initial Contact Info
    const existingContact = await ContactInfo.findOne();
    if (!existingContact) {
      await ContactInfo.create({
        address: '144, Pocket 1 Street, Pocket 1, Jasola Vihar, New Delhi, Delhi, India',
        phone: '+91 98104 64083',
        email: 'firoz@saffpoll.com',
        map_embed_url: ''
      });
      console.log('[DB Seed] Initial Contact Info created.');
    }

    console.log('[DB] Initialization complete.');
  } catch (error) {
    console.error('[DB] Connection Error:', error);
    throw error;
  }
};

export default mongoose.connection;
