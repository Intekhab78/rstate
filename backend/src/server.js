import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { initDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

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

// Health check endpoint
app.get('/health', (req, res) => {
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
