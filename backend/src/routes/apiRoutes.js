import express from 'express';
import {
  getAll,
  getById,
  createItem,
  updateItem,
  deleteItem,
  submitEnquiry,
  getHero,
  updateHero,
  getCoreValues,
  updateCoreValues,
  getHowItWorks,
  updateHowItWorks,
  getWhyChoose,
  updateWhyChoose,
  getContactCTA,
  updateContactCTA,
  getContactPage,
  updateContactPage,
  getAboutPage,
  updateAboutPage
} from '../controllers/crudController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

// Defined schema field filters for safe CRUD
const projectFields = ['title', 'category', 'location', 'description', 'image_url', 'status', 'details_json'];
const serviceFields = ['title', 'icon', 'description', 'details_json'];
const teamFields = ['name', 'role', 'image_url', 'bio'];
const insightFields = ['title', 'author', 'date', 'category', 'summary', 'content', 'image_url'];
const newsFields = ['title', 'date', 'category', 'summary', 'content', 'image_url'];
const testimonialFields = ['client_name', 'company', 'feedback', 'rating'];
const careerFields = ['title', 'department', 'location', 'type', 'description', 'requirements'];
const enquiryFields = ['status', 'notes'];
const contactFields = ['address', 'phone', 'email', 'map_embed_url'];

// Hero Section Routes
router.get('/hero', getHero);
router.put('/hero', requireAuth, updateHero);

// Core Values Routes
router.get('/core-values', getCoreValues);
router.put('/core-values', requireAuth, updateCoreValues);

// How It Works Routes
router.get('/how-it-works', getHowItWorks);
router.put('/how-it-works', requireAuth, updateHowItWorks);

// Why Choose Routes
router.get('/why-choose', getWhyChoose);
router.put('/why-choose', requireAuth, updateWhyChoose);

// Contact CTA Routes
router.get('/contact-cta', getContactCTA);
router.put('/contact-cta', requireAuth, updateContactCTA);

// Contact Page Complete Routes
router.get('/contact-page', getContactPage);
router.put('/contact-page', requireAuth, updateContactPage);

// About Page Complete Routes
router.get('/about-page', getAboutPage);
router.put('/about-page', requireAuth, updateAboutPage);

// Media Upload endpoint for Admin
router.post('/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, file_url: fileUrl, filename: req.file.filename });
});

// Projects Routes
router.get('/projects', getAll('projects'));
router.get('/projects/:id', getById('projects'));
router.post('/projects', requireAuth, createItem('projects', projectFields));
router.put('/projects/:id', requireAuth, updateItem('projects', projectFields));
router.delete('/projects/:id', requireAuth, deleteItem('projects'));

// Services Routes
router.get('/services', getAll('services'));
router.get('/services/:id', getById('services'));
router.post('/services', requireAuth, createItem('services', serviceFields));
router.put('/services/:id', requireAuth, updateItem('services', serviceFields));
router.delete('/services/:id', requireAuth, deleteItem('services'));

// Team Routes
router.get('/team', getAll('team'));
router.get('/team/:id', getById('team'));
router.post('/team', requireAuth, createItem('team', teamFields));
router.put('/team/:id', requireAuth, updateItem('team', teamFields));
router.delete('/team/:id', requireAuth, deleteItem('team'));

// Insights Routes
router.get('/insights', getAll('insights'));
router.get('/insights/:id', getById('insights'));
router.post('/insights', requireAuth, createItem('insights', insightFields));
router.put('/insights/:id', requireAuth, updateItem('insights', insightFields));
router.delete('/insights/:id', requireAuth, deleteItem('insights'));

// News Routes
router.get('/news', getAll('news'));
router.get('/news/:id', getById('news'));
router.post('/news', requireAuth, createItem('news', newsFields));
router.put('/news/:id', requireAuth, updateItem('news', newsFields));
router.delete('/news/:id', requireAuth, deleteItem('news'));

// Testimonials Routes
router.get('/testimonials', getAll('testimonials'));
router.get('/testimonials/:id', getById('testimonials'));
router.post('/testimonials', requireAuth, createItem('testimonials', testimonialFields));
router.put('/testimonials/:id', requireAuth, updateItem('testimonials', testimonialFields));
router.delete('/testimonials/:id', requireAuth, deleteItem('testimonials'));

// Careers Routes
router.get('/careers', getAll('careers'));
router.get('/careers/:id', getById('careers'));
router.post('/careers', requireAuth, createItem('careers', careerFields));
router.put('/careers/:id', requireAuth, updateItem('careers', careerFields));
router.delete('/careers/:id', requireAuth, deleteItem('careers'));

// Enquiries Routes
// Public Submission
router.post('/enquiries', upload.single('document'), submitEnquiry);
// Admin Management (Protected)
router.get('/enquiries', requireAuth, getAll('enquiries'));
router.get('/enquiries/:id', requireAuth, getById('enquiries'));
router.put('/enquiries/:id', requireAuth, updateItem('enquiries', enquiryFields));
router.delete('/enquiries/:id', requireAuth, deleteItem('enquiries'));

// Contact Info Routes
router.get('/contact', getAll('contact_info'));
router.put('/contact', requireAuth, updateItem('contact_info', contactFields));

export default router;
