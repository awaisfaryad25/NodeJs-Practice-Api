const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Author is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Blog', blogSchema);