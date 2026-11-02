const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, getDBStatus } = require('./config/db');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow frontend development
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
const organizationRoutes = require('./routes/organizationRoutes');
const { router: assessmentRoutes } = require('./routes/assessmentRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');

app.use('/api/organizations', organizationRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/roadmaps', roadmapRoutes);

// Health & Database Status
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'online',
    platform: 'ATLAS by People4Good API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.isConnected,
      host: dbStatus.host,
      databaseName: dbStatus.name,
      mode: dbStatus.isConnected ? 'MongoDB Atlas / Server' : 'In-Memory Fallback Active'
    }
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ATLAS by People4Good - AI-Enabled Digital Transformation for Grassroots NGOs',
    endpoints: {
      health: '/api/health',
      organizations: '/api/organizations',
      assessments: '/api/assessments',
      assessmentQuestions: '/api/assessments/questions',
      roadmaps: '/api/roadmaps'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

// Start Server immediately and connect to MongoDB in background
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ATLAS by People4Good Backend API Server Running`);
  console.log(`  Port: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
  
  // Connect to DB asynchronously
  connectDB().catch((err) => {
    console.warn(`[MongoDB] Initial connection note: ${err.message}`);
  });
});

module.exports = app;
