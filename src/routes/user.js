// src/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

// Get all registered users (protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Fetch all users, excluding the password field
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;