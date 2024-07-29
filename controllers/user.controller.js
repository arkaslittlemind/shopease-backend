const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.referralCode = `REF${Math.random().toString(36).substring(7).toUpperCase()}`;
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (typeof user.comparePassword !== 'function') {
      console.error('comparePassword is not a function');
      return res.status(500).json({ message: 'Server error' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
    res.json({ token });
  } catch (error) {
    // console.error('Login error:', error); 
    res.status(400).json({ message: error.message });
  }
};