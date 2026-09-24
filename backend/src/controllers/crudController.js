import HeroContent from '../models/HeroContent.js';
import CoreValues from '../models/CoreValues.js';
import HowItWorks from '../models/HowItWorks.js';
import WhyChoose from '../models/WhyChoose.js';
import ContactCTA from '../models/ContactCTA.js';
import ContactPage from '../models/ContactPage.js';
import AboutPage from '../models/AboutPage.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Team from '../models/Team.js';
import Insight from '../models/Insight.js';
import News from '../models/News.js';
import Testimonial from '../models/Testimonial.js';
import Career from '../models/Career.js';
import Enquiry from '../models/Enquiry.js';
import ContactInfo from '../models/ContactInfo.js';

const modelMap = {
  projects: Project,
  services: Service,
  team: Team,
  insights: Insight,
  news: News,
  testimonials: Testimonial,
  careers: Career,
  enquiries: Enquiry,
  contact_info: ContactInfo
};

// Generic helper for fetching all records from a collection
export const getAll = (tableName) => async (req, res) => {
  try {
    const Model = modelMap[tableName];
    if (!Model) {
      return res.status(400).json({ success: false, message: `Invalid collection: ${tableName}` });
    }
    const rows = await Model.find().sort({ created_at: -1 });
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error);
    res.status(500).json({ success: false, message: `Failed to retrieve ${tableName}.` });
  }
};

// Generic helper for fetching one record by ID
export const getById = (tableName) => async (req, res) => {
  try {
    const { id } = req.params;
    const Model = modelMap[tableName];
    if (!Model) {
      return res.status(400).json({ success: false, message: `Invalid collection: ${tableName}` });
    }
    const row = await Model.findById(id);
    if (!row) {
      return res.status(404).json({ success: false, message: `Item not found in ${tableName}.` });
    }
    res.json({ success: true, data: row });
  } catch (error) {
    console.error(`Error fetching item from ${tableName}:`, error);
    res.status(500).json({ success: false, message: `Failed to retrieve item.` });
  }
};

// Create a record
export const createItem = (tableName, allowedFields) => async (req, res) => {
  try {
    const Model = modelMap[tableName];
    if (!Model) {
      return res.status(400).json({ success: false, message: `Invalid collection: ${tableName}` });
    }

    const payload = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    const createdRecord = await Model.create(payload);
    res.status(201).json({ success: true, message: 'Item created successfully.', data: createdRecord });
  } catch (error) {
    console.error(`Error creating item in ${tableName}:`, error);
    res.status(500).json({ success: false, message: `Failed to create item.` });
  }
};

// Update a record
export const updateItem = (tableName, allowedFields) => async (req, res) => {
  try {
    const { id } = req.params;
    const Model = modelMap[tableName];
    if (!Model) {
      return res.status(400).json({ success: false, message: `Invalid collection: ${tableName}` });
    }

    const payload = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    const updatedRecord = await Model.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }
    res.json({ success: true, message: 'Item updated successfully.', data: updatedRecord });
  } catch (error) {
    console.error(`Error updating item in ${tableName}:`, error);
    res.status(500).json({ success: false, message: 'Failed to update item.' });
  }
};

// Delete a record
export const deleteItem = (tableName) => async (req, res) => {
  try {
    const { id } = req.params;
    const Model = modelMap[tableName];
    if (!Model) {
      return res.status(400).json({ success: false, message: `Invalid collection: ${tableName}` });
    }

    const existing = await Model.findByIdAndDelete(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    res.json({ success: true, message: 'Item deleted successfully.', id });
  } catch (error) {
    console.error(`Error deleting item from ${tableName}:`, error);
    res.status(500).json({ success: false, message: 'Failed to delete item.' });
  }
};

// Get Hero section settings
export const getHero = async (req, res) => {
  try {
    const hero = await HeroContent.findOne();
    if (!hero) {
      return res.status(404).json({ success: false, message: 'Hero content not found.' });
    }
    res.json({ success: true, data: hero });
  } catch (error) {
    console.error('Error fetching hero content:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve hero content.' });
  }
};

// Update Hero section settings
export const updateHero = async (req, res) => {
  try {
    const { welcome_title, company_name, subtitle, slides, pills } = req.body;
    let existing = await HeroContent.findOne();

    if (existing) {
      if (welcome_title !== undefined) existing.welcome_title = welcome_title;
      if (company_name !== undefined) existing.company_name = company_name;
      if (subtitle !== undefined) existing.subtitle = subtitle;
      if (Array.isArray(slides)) existing.slides = slides;
      if (Array.isArray(pills)) existing.pills = pills;
      await existing.save();
    } else {
      existing = await HeroContent.create({
        welcome_title: welcome_title || 'Welcome to',
        company_name: company_name || 'Saffpoll',
        subtitle: subtitle || 'EXPERT BUILDING CONTRACTOR SERVICES',
        slides: slides || [],
        pills: pills || []
      });
    }

    res.json({ success: true, message: 'Hero content updated successfully.', data: existing });
  } catch (error) {
    console.error('Error updating hero content:', error);
    res.status(500).json({ success: false, message: 'Failed to update hero content.' });
  }
};

// Get Core Values section settings
export const getCoreValues = async (req, res) => {
  try {
    const data = await CoreValues.findOne();
    if (!data) {
      return res.status(404).json({ success: false, message: 'Core values content not found.' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching core values content:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve core values content.' });
  }
};

// Update Core Values section settings
export const updateCoreValues = async (req, res) => {
  try {
    const { label, title, description, bg_image, btn_text, btn_link, items } = req.body;
    let existing = await CoreValues.findOne();

    if (existing) {
      if (label !== undefined) existing.label = label;
      if (title !== undefined) existing.title = title;
      if (description !== undefined) existing.description = description;
      if (bg_image !== undefined) existing.bg_image = bg_image;
      if (btn_text !== undefined) existing.btn_text = btn_text;
      if (btn_link !== undefined) existing.btn_link = btn_link;
      if (Array.isArray(items)) existing.items = items;
      await existing.save();
    } else {
      existing = await CoreValues.create({
        label: label || 'What Drives Us',
        title: title || 'OUR CORE VALUES',
        description: description || '',
        bg_image: bg_image || '',
        btn_text: btn_text !== undefined ? btn_text : 'Learn more about our approach',
        btn_link: btn_link !== undefined ? btn_link : '#about',
        items: items || []
      });
    }

    res.json({ success: true, message: 'Core values updated successfully.', data: existing });
  } catch (error) {
    console.error('Error updating core values content:', error);
    res.status(500).json({ success: false, message: 'Failed to update core values content.' });
  }
};

// Get How It Works section settings
export const getHowItWorks = async (req, res) => {
  try {
    const data = await HowItWorks.findOne();
    if (!data) {
      return res.status(404).json({ success: false, message: 'How it works content not found.' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching how it works content:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve how it works content.' });
  }
};

// Update How It Works section settings
export const updateHowItWorks = async (req, res) => {
  try {
    const { title, subtitle, bottom_text, bottom_subtext, steps } = req.body;
    let existing = await HowItWorks.findOne();

    if (existing) {
      if (title !== undefined) existing.title = title;
      if (subtitle !== undefined) existing.subtitle = subtitle;
      if (bottom_text !== undefined) existing.bottom_text = bottom_text;
      if (bottom_subtext !== undefined) existing.bottom_subtext = bottom_subtext;
      if (Array.isArray(steps)) existing.steps = steps;
      await existing.save();
    } else {
      existing = await HowItWorks.create({
        title: title || 'How Saffpoll Works',
        subtitle: subtitle || '',
        bottom_text: bottom_text || '',
        bottom_subtext: bottom_subtext || '',
        steps: steps || []
      });
    }

    res.json({ success: true, message: 'How it works section updated successfully.', data: existing });
  } catch (error) {
    console.error('Error updating how it works content:', error);
    res.status(500).json({ success: false, message: 'Failed to update how it works content.' });
  }
};

// Get Why Choose section settings
export const getWhyChoose = async (req, res) => {
  try {
    const data = await WhyChoose.findOne();
    if (!data) {
      return res.status(404).json({ success: false, message: 'Why Choose content not found.' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching Why Choose content:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve Why Choose content.' });
  }
};

// Update Why Choose section settings
export const updateWhyChoose = async (req, res) => {
  try {
    const { tag, title, description, cards, stats, bottom_values } = req.body;
    let existing = await WhyChoose.findOne();

    if (existing) {
      if (tag !== undefined) existing.tag = tag;
      if (title !== undefined) existing.title = title;
      if (description !== undefined) existing.description = description;
      if (Array.isArray(cards)) existing.cards = cards;
      if (Array.isArray(stats)) existing.stats = stats;
      if (Array.isArray(bottom_values)) existing.bottom_values = bottom_values;
      await existing.save();
    } else {
      existing = await WhyChoose.create({
        tag: tag || 'Why Saffpoll',
        title: title || 'Why Choose Saffpoll',
        description: description || '',
        cards: cards || [],
        stats: stats || [],
        bottom_values: bottom_values || []
      });
    }

    res.json({ success: true, message: 'Why Choose section updated successfully.', data: existing });
  } catch (error) {
    console.error('Error updating Why Choose content:', error);
    res.status(500).json({ success: false, message: 'Failed to update Why Choose content.' });
  }
};

// Get Contact CTA section settings
export const getContactCTA = async (req, res) => {
  try {
    const data = await ContactCTA.findOne();
    if (!data) {
      return res.status(404).json({ success: false, message: 'Contact CTA content not found.' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching Contact CTA content:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve Contact CTA content.' });
  }
};

// Update Contact CTA section settings
export const updateContactCTA = async (req, res) => {
  try {
    const { enabled, tag, title, description, bg_image, buttons, contact_details } = req.body;
    let existing = await ContactCTA.findOne();

    if (existing) {
      if (enabled !== undefined) existing.enabled = enabled;
      if (tag !== undefined) existing.tag = tag;
      if (title !== undefined) existing.title = title;
      if (description !== undefined) existing.description = description;
      if (bg_image !== undefined) existing.bg_image = bg_image;
      if (Array.isArray(buttons)) existing.buttons = buttons;
      if (Array.isArray(contact_details)) existing.contact_details = contact_details;
      await existing.save();
    } else {
      existing = await ContactCTA.create({
        enabled: enabled !== undefined ? enabled : true,
        tag: tag || "Let's Build Together",
        title: title || 'Plan your next project with Saffpoll',
        description: description || '',
        bg_image: bg_image || '',
        buttons: buttons || [],
        contact_details: contact_details || []
      });
    }

    res.json({ success: true, message: 'Contact CTA section updated successfully.', data: existing });
  } catch (error) {
    console.error('Error updating Contact CTA content:', error);
    res.status(500).json({ success: false, message: 'Failed to update Contact CTA content.' });
  }
};

// Get Contact Page complete settings
export const getContactPage = async (req, res) => {
  try {
    const data = await ContactPage.findOne();
    if (!data) {
      return res.status(404).json({ success: false, message: 'Contact Page content not found.' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching Contact Page content:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve Contact Page content.' });
  }
};

// Update Contact Page complete settings
export const updateContactPage = async (req, res) => {
  try {
    const { hero, contact_cards, form_settings, office_info, quick_actions, map, faqs, final_cta } = req.body;
    let existing = await ContactPage.findOne();

    if (existing) {
      if (typeof hero === 'object') existing.hero = hero;
      if (Array.isArray(contact_cards)) existing.contact_cards = contact_cards;
      if (typeof form_settings === 'object') existing.form_settings = form_settings;
      if (typeof office_info === 'object') existing.office_info = office_info;
      if (Array.isArray(quick_actions)) existing.quick_actions = quick_actions;
      if (typeof map === 'object') existing.map = map;
      if (Array.isArray(faqs)) existing.faqs = faqs;
      if (typeof final_cta === 'object') existing.final_cta = final_cta;
      await existing.save();
    } else {
      existing = await ContactPage.create({
        hero: hero || {},
        contact_cards: contact_cards || [],
        form_settings: form_settings || {},
        office_info: office_info || {},
        quick_actions: quick_actions || [],
        map: map || {},
        faqs: faqs || [],
        final_cta: final_cta || {}
      });
    }

    res.json({ success: true, message: 'Contact Page content updated successfully.', data: existing });
  } catch (error) {
    console.error('Error updating Contact Page content:', error);
    res.status(500).json({ success: false, message: 'Failed to update Contact Page content.' });
  }
};

// Get About Page complete settings
export const getAboutPage = async (req, res) => {
  try {
    const data = await AboutPage.findOne();
    if (!data) {
      return res.status(404).json({ success: false, message: 'About Page content not found.' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching About Page content:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve About Page content.' });
  }
};

// Update About Page complete settings
export const updateAboutPage = async (req, res) => {
  try {
    const { hero, story, mission, people } = req.body;
    let existing = await AboutPage.findOne();

    if (existing) {
      if (typeof hero === 'object') existing.hero = hero;
      if (typeof story === 'object') existing.story = story;
      if (typeof mission === 'object') existing.mission = mission;
      if (typeof people === 'object') existing.people = people;
      await existing.save();
    } else {
      existing = await AboutPage.create({
        hero: hero || {},
        story: story || {},
        mission: mission || {},
        people: people || {}
      });
    }

    res.json({ success: true, message: 'About Page content updated successfully.', data: existing });
  } catch (error) {
    console.error('Error updating About Page content:', error);
    res.status(500).json({ success: false, message: 'Failed to update About Page content.' });
  }
};

// Special controller for Public Enquiry Form Submission
export const submitEnquiry = async (req, res) => {
  try {
    const {
      name,
      company,
      mobile,
      email,
      location,
      project_type,
      estimated_budget,
      requirement
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required fields.' });
    }

    const file_url = req.file ? `/uploads/${req.file.filename}` : req.body.file_url || null;

    const created = await Enquiry.create({
      name,
      company: company || '',
      mobile: mobile || '',
      email,
      location: location || '',
      project_type: project_type || '',
      estimated_budget: estimated_budget || '',
      requirement: requirement || '',
      file_url
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our team will contact you shortly.',
      data: created
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to submit enquiry.' });
  }
};
