const express = require('express');
require('dotenv').config();
const { registerUser, loginUser, getToken } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/tokens/:id', getToken);

module.exports = authRouter;
