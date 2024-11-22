const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

async function connect() {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (error) {        
        console.log('Error while connecting to MongoDB', error);
    }
}

module.exports = connect;