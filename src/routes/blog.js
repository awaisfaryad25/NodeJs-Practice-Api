const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const authMiddleware = require('../middleware/auth');

// Create a new blog (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { title, image, category, summary, content, tags, publishedAt } = req.body;

  try {
    if (!title || !category || !summary || !content) {
      return res.status(400).json({ message: 'Title, category, summary, and content are required' });
    }

    const blog = new Blog({
      title,
      image,
      category,
      summary,
      content,
      tags: tags || [],
      author: req.user.userId, // From authMiddleware
      publishedAt: publishedAt ? new Date(publishedAt) : null,
    });

    await blog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      blog: {
        _id: blog._id,
        title: blog.title,
        image: blog.image,
        category: blog.category,
        summary: blog.summary,
        content: blog.content,
        tags: blog.tags,
        author: blog.author,
        createdAt: blog.createdAt,
        publishedAt: blog.publishedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all blogs (protected route, with optional pagination)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate('author', 'firstname lastname email -_id')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest first
    const totalBlogs = await Blog.countDocuments();

    res.status(200).json({
      message: 'Blogs retrieved successfully',
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get blog by ID (protected route)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'firstname lastname email -_id');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({
      message: 'Blog retrieved successfully',
      blog,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get blog by ID (protected route)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'firstname lastname email -_id');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({
      message: 'Blog retrieved successfully',
      blog,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update blog by ID (protected route, author only)
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, image, category, summary, content, tags, publishedAt } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the authenticated user is the author
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }

    // Update fields if provided
    if (title) blog.title = title;
    if (image !== undefined) blog.image = image; // Allow null to clear image
    if (category) blog.category = category;
    if (summary) blog.summary = summary;
    if (content) blog.content = content;
    if (tags) blog.tags = tags;
    if (publishedAt !== undefined) blog.publishedAt = publishedAt ? new Date(publishedAt) : null;

    await blog.save();

    res.status(200).json({
      message: 'Blog updated successfully',
      blog: {
        _id: blog._id,
        title: blog.title,
        image: blog.image,
        category: blog.category,
        summary: blog.summary,
        content: blog.content,
        tags: blog.tags,
        author: blog.author,
        createdAt: blog.createdAt,
        publishedAt: blog.publishedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;