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

    if (existingUsername && existingEmail) {
      return res.status(400).json({ message: 'Username and email already exist' });
    } else if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    } else if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error', error);
    res.status(500).json({ message: 'Registration error' });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'No user exists with that username' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    await redisClient.set(username, token);

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: 'Login error' });
  }
}

async function getToken(req, res) {
  try {
    const username = req.params.id;
    const token = await redisClient.get(username);
    if (token) res.status(200).json(token);
    else res.status(404).json({ message: 'No token found' });
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t get token' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getToken,
};
