/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The blog ID
 *           example: 67890
 *         title:
 *           type: string
 *           description: Title of the blog
 *           example: My First Blog
 *         content:
 *           type: string
 *           description: Content of the blog
 *           example: This is the content of my blog post.
 *         author:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *               example: John
 *             lastname:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: john@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date the blog was created
 *           example: 2025-08-11T12:28:00Z
 *     BlogInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog
 *           example: My First Blog
 *         content:
 *           type: string
 *           description: Content of the blog
 *           example: This is the content of my blog post.
 */