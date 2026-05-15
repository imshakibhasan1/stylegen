const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect, isAdmin } = require('../middleware/auth');
const { dummyCategories } = require('../data/dummyProducts');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('subCategories')
      .sort({ displayOrder: 1 });

    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    console.warn('⚠️ Database error, using fallback categories:', error.message);
    
    // Fallback to dummy categories
    res.status(200).json({ 
      success: true, 
      count: dummyCategories.length, 
      data: dummyCategories,
      fromFallback: true,
      message: '📦 Showing demo categories (database unavailable)'
    });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('subCategories');

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.warn('⚠️ Database error, checking fallback categories:', error.message);
    
    // Fallback to dummy categories
    const dummyCategory = dummyCategories.find(c => c._id === req.params.id);
    
    if (dummyCategory) {
      return res.status(200).json({ 
        success: true, 
        data: dummyCategory,
        fromFallback: true,
        message: '📦 Showing demo category (database unavailable)'
      });
    }
    
    res.status(404).json({ success: false, message: 'Category not found' });
  }
});

// @route   POST /api/categories
// @desc    Create category (Admin)
// @access  Private/Admin
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category (Admin)
// @access  Private/Admin
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category (Admin)
// @access  Private/Admin
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
