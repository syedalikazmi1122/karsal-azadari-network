const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const writingRoutes = require('./routes/writingRoutes');
const { initializeAdmin } = require('./controllers/authcontroller');

dotenv.config();

const corsOptions = {
  origin: (origin, callback) => {
    // Allow all origins for non-credentialed requests
    // For credentialed requests, allow specific origins
    const allowedOrigins = [
      'http://localhost:5173',
      process.env.FRONTEND_URL, // Add your production frontend URL in .env
      // Add other allowed origins as needed
    ].filter(Boolean); // Remove undefined values

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin || '*'); // Return specific origin or '*' if no origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions)); // Respond to OPTIONS requests for all routes

app.use('/api/auth', authRoutes);
app.use('/api/writings', writingRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await initializeAdmin(); // Initialize admin user
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));