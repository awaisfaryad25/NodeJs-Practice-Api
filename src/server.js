// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();
// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication API',
      version: '1.0.0',
      description: 'API for user registration, login, and user management',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['firstname', 'lastname', 'email', 'contact', 'password'],
          properties: {
            firstname: { type: 'string', description: 'User\'s first name', example: 'John' },
            lastname: { type: 'string', description: 'User\'s last name', example: 'Doe' },
            email: { type: 'string', description: 'User\'s email address', example: 'john@example.com' },
            contact: { type: 'string', description: 'User\'s contact number', example: '+1234567890' },
            password: { type: 'string', description: 'User\'s password (min 6 characters)', example: 'secure123' },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'User\'s unique ID', example: '12345' },
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            email: { type: 'string' },
            contact: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/docs/authSwagger.js', './src/docs/userSwagger.js'], // Include both files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));