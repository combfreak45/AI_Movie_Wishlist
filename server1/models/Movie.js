const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  type: {
    type: String,
    enum: ['movie', 'series'],
    default: 'movie'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['wishlist', 'watched'],
    default: 'wishlist'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  comment: {
    type: String,
    maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    default: ''
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateWatched: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Create compound index for user and title to prevent duplicates
movieSchema.index({ user: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('Movie', movieSchema);
