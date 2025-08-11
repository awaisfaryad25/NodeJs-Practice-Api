/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - summary
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
 *         image:
 *           type: string
 *           description: URL of the blog's image
 *           example: https://example.com/images/blog.jpg
 *           nullable: true
 *         category:
 *           type: string
 *           description: Category or topic of the blog
 *           example: Technology
 *         summary:
 *           type: string
 *           description: Brief summary of the blog
 *           example: A brief overview of the blog content.
 *         content:
 *           type: string
 *           description: Content of the blog
 *           example: This is the full content of my blog post.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the blog
 *           example: ["tech", "programming"]
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
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: Date the blog was published
 *           example: 2025-08-11T12:30:00Z
 *           nullable: true
 *     BlogInput:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - summary
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog
 *           example: My First Blog
 *         image:
 *           type: string
 *           description: URL of the blog's image
 *           example: https://example.com/images/blog.jpg
 *           nullable: true
 *         category:
 *           type: string
 *           description: Category or topic of the blog
 *           example: Technology
 *         summary:
 *           type: string
 *           description: Brief summary of the blog
 *           example: A brief overview of the blog content.
 *         content:
 *           type: string
 *           description: Content of the blog
 *           example: This is the full content of my blog post.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the blog
 *           example: ["tech", "programming"]
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: Date the blog is published
 *           example: 2025-08-11T12:30:00Z
 *           nullable: true
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog created successfully
 *                 blog:
 *                   $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Title, category, summary, and content are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Retrieve all blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of blogs per page
 *     responses:
 *       200:
 *         description: List of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blogs retrieved successfully
 *                 blogs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 *                 totalBlogs:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
