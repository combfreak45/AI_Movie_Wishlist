const express = require('express');
const Movie = require('../models/Movie');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get all movies for logged in user
// @route   GET /api/movies
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = { user: req.user._id };
    
    if (status) {
      query.status = status;
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add movie to wishlist
// @route   POST /api/movies
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, type } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Movie title is required'
      });
    }

    // Check if movie already exists for this user
    const existingMovie = await Movie.findOne({
      title: title.trim(),
      user: req.user._id
    });

    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: 'Movie already exists in your list'
      });
    }

    const movie = await Movie.create({
      title: title.trim(),
      type: type || 'movie',
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error(error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update movie (mark as watched, add rating/comment)
// @route   PUT /api/movies/:id
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    let movie = await Movie.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    const { status, rating, comment } = req.body;

    // Update fields
    if (status !== undefined) {
      movie.status = status;
      if (status === 'watched' && !movie.dateWatched) {
        movie.dateWatched = new Date();
      }
    }

    if (rating !== undefined) {
      movie.rating = rating;
    }

    if (comment !== undefined) {
      movie.comment = comment;
    }

    await movie.save();

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error(error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
