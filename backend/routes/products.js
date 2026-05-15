const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, isAdmin } = require('../middleware/auth');
const { dummyProducts } = require('../data/dummyProducts');

// Helper function to apply filters to dummy products
const applyFilters = (products, filters) => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(p => p.category._id === filters.category);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
  }

  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
  }

  if (filters.featured === 'true') {
    filtered = filtered.filter(p => p.isFeatured);
  }

  return filtered;
};

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
router.get('/', async (req, res) => {
  console.log('📍 GET /api/products request received');
  
  try {
    // Try to fetch from database
    const { category, minPrice, maxPrice, search, featured, page = 1, limit = 10 } = req.query;
    console.log('Attempting database query...');
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (featured === 'true') filter.isFeatured = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
      .populate('category')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    console.log('✅ Database query successful, returning', products.length, 'products');
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products,
    });
  } catch (error) {
    console.warn('⚠️ Database error:', error.message);
    console.log('📦 Returning fallback products, count:', dummyProducts.length);
    
    // Return fallback dummy products immediately
    const response = {
      success: true,
      count: dummyProducts.length,
      total: dummyProducts.length,
      page: 1,
      pages: 1,
      data: dummyProducts,
      fromFallback: true,
      message: '📦 Demo products (database unavailable)'
    };
    
    console.log('Sending response...');
    res.status(200).json(response);
    console.log('Response sent');
  }
});

// @route   GET /api/products/featured/all
// @desc    Get featured products
// @access  Public
router.get('/featured/all', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true })
      .populate('category')
      .limit(8)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.warn('⚠️ Database error, using fallback featured products:', error.message);
    
    // Fallback to dummy featured products
    const featuredDummy = dummyProducts.filter(p => p.isFeatured).slice(0, 8);
    res.status(200).json({ 
      success: true, 
      count: featuredDummy.length, 
      data: featuredDummy,
      fromFallback: true,
      message: '📦 Showing demo featured products (database unavailable)'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').populate('reviews.userId');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.warn('⚠️ Database error, checking fallback products:', error.message);
    
    // Fallback to dummy products
    const dummyProduct = dummyProducts.find(p => p._id === req.params.id);
    
    if (dummyProduct) {
      return res.status(200).json({ 
        success: true, 
        data: dummyProduct,
        fromFallback: true,
        message: '📦 Showing demo product (database unavailable)'
      });
    }
    
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

// @route   POST /api/products
// @desc    Create product (Admin)
// @access  Private/Admin
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product (Admin)
// @access  Private/Admin
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (Admin)
// @access  Private/Admin
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
