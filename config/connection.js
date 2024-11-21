const mongoose = require('mongoose');
const {logger} = require('../utils/logger');

const URI = process.env.MONGODB_URI;

async function connect() {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        logger(0,'Error while connecting to MongoDB - ' + error,'connection.js');
        console.log('Error while connecting to MongoDB', error);
    }
}

module.exports = connect;