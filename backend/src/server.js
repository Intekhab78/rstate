import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { initDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import Project from './models/Project.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for Vite frontend
app.use(
  cors({
    origin: [
      // ── Local Development ──────────────────────────
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      // ── Production / Deployed Frontend ─────────────
      'https://rstate.jtsmiddleeast.com',
      'http://rstate.jtsmiddleeast.com',
    ],
    credentials: true
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
const uploadsPath = path.resolve('./uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// XML Sitemap Endpoint
app.get(['/sitemap.xml', '/api/sitemap.xml'], async (req, res) => {
  try {
    const siteUrl = (process.env.SITE_URL || 'https://rstate.jtsmiddleeast.com').replace(/\/+$/, '');
    const staticPages = [
      { url: '/', changefreq: 'weekly', priority: '1.0' },
      { url: '/about', changefreq: 'monthly', priority: '0.8' },
      { url: '/project', changefreq: 'weekly', priority: '0.9' },
      { url: '/services', changefreq: 'monthly', priority: '0.8' },
      { url: '/contactUs', changefreq: 'monthly', priority: '0.7' }
    ];

    const projects = await Project.find().select('slug updated_at created_at seo details_json').lean();
    const hasSaffpoll = projects.some(p => p.slug === 'saffpoll-residences');
    const allProjects = [...projects];
    if (!hasSaffpoll) {
      allProjects.push({ slug: 'saffpoll-residences', updated_at: new Date() });
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static public pages
    for (const p of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}${p.url}</loc>\n`;
      xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      xml += `    <priority>${p.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic public projects (excluding noindex)
    for (const p of allProjects) {
      let isNoIndex = false;
      if (p.seo && p.seo.noindex) isNoIndex = true;
      if (p.details_json) {
        try {
          const d = JSON.parse(p.details_json);
          if (d.seo && d.seo.noindex) isNoIndex = true;
        } catch (e) {}
      }
      if (isNoIndex) continue;

      const dateObj = p.updated_at || p.created_at || new Date();
      const lastmod = new Date(dateObj).toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}/project/${p.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Error generating sitemap:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// Robots.txt Endpoint
app.get(['/robots.txt', '/api/robots.txt'], (req, res) => {
  const siteUrl = (process.env.SITE_URL || 'https://rstate.jtsmiddleeast.com').replace(/\/+$/, '');
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/*\nDisallow: /api/*\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
});

// Health check endpoint
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', service: 'SaffPol CMS API', timestamp: new Date().toISOString() });
});

// Root fallback
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SaffPol CMS Backend API', docs: '/api' });
});

// Initialize database and start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n=================================`);
      console.log(`🚀 SaffPol Backend Server running on http://localhost:${PORT}`);
      console.log(`=================================\n`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
