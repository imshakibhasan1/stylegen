const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { dummyUsers } = require('../data/dummyUsers');

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d',
  });
};

// Helper function to convert user to JSON format
const userToJSON = (user) => {
  const userObj = user.toJSON ? user.toJSON() : user;
  return {
    _id: userObj._id,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    role: userObj.role,
    profilePicture: userObj.profilePicture,
    phoneNumber: userObj.phoneNumber,
    addresses: userObj.addresses,
  };
};

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Try database first
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      const token = generateToken(user._id, user.role);

      res.status(201).json({
        success: true,
        token,
        user: userToJSON(user),
      });
    } catch (dbError) {
      // Fallback: Check dummy users
      console.log('📍 Using fallback registration with dummy users');
      
      const existingUser = dummyUsers.find((u) => u.email === email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // Create a new dummy user in memory
      const newUser = {
        _id: `user-${Date.now()}`,
        firstName,
        lastName,
        email,
        password,
        role: 'user',
        profilePicture: 'https://via.placeholder.com/400x400?text=' + firstName,
        phoneNumber: '',
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = generateToken(newUser._id, newUser.role);

      res.status(201).json({
        success: true,
        token,
        user: {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
          profilePicture: newUser.profilePicture,
        },
        fromFallback: true,
        message: '✅ Account created (using demo mode)',
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Try database first
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.role);

      res.status(200).json({
        success: true,
        token,
        user: userToJSON(user),
      });
    } catch (dbError) {
      // Fallback: Check dummy users
      console.log('📍 Using fallback login with dummy users');
      
      const user = dummyUsers.find((u) => u.email === email);
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.role);

      res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
          phoneNumber: user.phoneNumber,
          addresses: user.addresses,
        },
        fromFallback: true,
        message: '✅ Logged in (using demo mode)',
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
