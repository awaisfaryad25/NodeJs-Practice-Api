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

module.exports = router;