const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, isAdmin } = require('../middleware/auth');
const { dummyUsers } = require('../data/dummyUsers');

// @route   GET /api/users/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/profile/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    // Fallback: Check dummy users
    console.log('📍 Using fallback profile retrieval with dummy users');
    const user = dummyUsers.find((u) => u._id === req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ 
      success: true, 
      data: user,
      fromFallback: true,
      message: '✅ Using demo profile data'
    });
  }
});

// @route   PUT /api/users/profile/update
// @desc    Update user profile
// @access  Private
router.put('/profile/update', protect, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phoneNumber, profilePicture },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   POST /api/users/address/add
// @desc    Add address
// @access  Private
router.post('/address/add', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.addresses.push(req.body);
    await user.save();

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/users/address/update/:addressIndex
// @desc    Update address
// @access  Private
router.put('/address/update/:addressIndex', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { addressIndex } = req.params;

    if (addressIndex < 0 || addressIndex >= user.addresses.length) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...req.body };
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/users/address/delete/:addressIndex
// @desc    Delete address
// @access  Private
router.delete('/address/delete/:addressIndex', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { addressIndex } = req.params;

    if (addressIndex < 0 || addressIndex >= user.addresses.length) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    user.addresses.splice(addressIndex, 1);
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/users/password/change
// @desc    Change password
// @access  Private
router.post('/password/change', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const user = await User.findById(req.userId).select('+password');

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   GET /api/users
// @desc    Get all users (Admin)
// @access  Private/Admin
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find()
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: users,
    });
  } catch (error) {
    // Fallback: Return dummy users
    console.log('📍 Using fallback users list with dummy users');
    
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const paginatedUsers = dummyUsers.slice(skip, skip + limitNum);
    const total = dummyUsers.length;

    res.status(200).json({
      success: true,
      count: paginatedUsers.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: paginatedUsers,
      fromFallback: true,
      message: '📊 Using demo users data',
    });
  }
});

module.exports = router;
