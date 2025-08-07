const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'API for user authentication with signup and login endpoints',
    },
    servers: [
      {
        url: 'http://localhost:3000',
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
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'yourpassword',
            },
          },
          required: ['email', 'password'],
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5c部分:JWT...',
            },
            userId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Invalid credentials',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['../routes/auth.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;