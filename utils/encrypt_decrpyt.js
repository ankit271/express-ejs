const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    try {
        // Generate salt (recommended saltRounds is 10)
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        
        // Generate hash using the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        
        return {
            salt: salt,
            hashedPassword: hashedPassword
        };
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error verifying password: ' + error.message);
    }
}

module.exports = { encryptPassword, verifyPassword };


