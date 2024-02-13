const mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

async function mongoConnect() {
  await mongoose.connect(MONGO_URI);
}

module.exports = mongoConnect;
