const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const redisClient = require('../utils/redis');
const User = require("../models/user.model");

require('dotenv').config();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const SECRET_KEY = process.env.SECRET_KEY;

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername && existingEmail) return res.status(409).json({ message: 'Username and email already exist.' });
    else if (existingUsername) return res.status(409).json({ message: 'Username already exists.' });
    else if (existingEmail) return res.status(409).json({ message: 'Email already exists.' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'An error occurred while attempting to register a user.' });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User doesn\'t exist.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    await redisClient.set(username, token);

    res.status(200).json({ token, message: 'User loggedin successfully!' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred while attempting to login a user.' });
  }
}

async function getToken(req, res) {
  try {
    const username = req.params.id;
    const token = await redisClient.get(username);
    if (token) res.status(200).json(token);
    else res.status(404).json({ message: 'Token not found.' });
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t get token.' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getToken,
};
