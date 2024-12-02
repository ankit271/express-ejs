const User = require('../models/User'); 

async function addCountryField() {
    try {
        await User.updateMany({}, { $set: { country: 'India' } });
        console.log('Country field added to all users.');
    } catch (error) {
        console.error('Error updating documents:', error);
    }
}

module.exports = { addCountryField } ; 