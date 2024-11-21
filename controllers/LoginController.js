const User = require('../models/User');
const { verifyPassword }  = require('../utils/encrypt_decrpyt');
const { logger } = require('../utils/logger');

async function login(req, res) {
    try {

        const { email , password } = req.body;

        const user = await User.find({ "email": email});
        
        if(isArrayEmptyOrNull(user)){
            return res.status(404).render('layout',{ message : 'User not found.',
                            title: 'Login', 
                            greet : '',
                            content: './userlanding/login'});
        }
        
        const hashedPassword = user[0].password;
        
        const isMatch = await verifyPassword(password, hashedPassword);
        
        if (isMatch) {
            req.session.email = email;
            res.status(200).render('layout',{ 
                                 email: req.session.email  
                                ,content: './userlanding/landing'
                                ,greet : getGreeting() + req.session.email  
                                ,title: 'Dashboard' 
                            });
        } else {
            res.status(401).render('layout',{ message : 'Invalid credentials.',
                            title: 'Login', 
                            greet : '',
                            content: './userlanding/login'});
        }
    } catch (error) {
        logger(0, error.message, 'login');
        throw new Error('Error while login : ' + error.message);
    }
}

function isArrayEmptyOrNull(arr) {
    return !Array.isArray(arr) || arr.length === 0;
}

function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good morning - ";
    } else if (hour < 18) {
        greeting = "Good afternoon - ";
    } else {
        greeting = "Good evening - ";
    }

    return greeting;
}


module.exports = { login };