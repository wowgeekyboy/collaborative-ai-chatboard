const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const demoUser = {
  email: "demo@example.com",
  password: "demo123",
  username: "Demo User"
};

// Demo login controller
const demoLogin = async (req, res) => {
  try {
    // Check if demo user exists, if not create it
    let user = await User.findOne({ email: demoUser.email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(demoUser.password, 10);
      user = await User.create({
        ...demoUser,
        password: hashedPassword
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    console.error("Demo login error:", error);
    res.status(500).json({ message: "Error logging in with demo account" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, demoLogin };