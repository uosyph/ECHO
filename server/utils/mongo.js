const mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

async function mongoConnect() {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = mongoConnect;
