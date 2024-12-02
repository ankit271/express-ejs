const User = require('../models/User');
const { verifyPassword }  = require('../utils/encrypt_decrpyt');
const { generateAccessToken }  = require('../utils/auth');
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
            const token = generateAccessToken({ username: req.body.username });
            //console.log("token",token);
            
            res.status(200).render('layout',{ 
                                 email: req.session.email  
                                ,content: './userlanding/landing'
                                ,greet : res.locals.commonData.getGreeting() + req.session.email  
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

async function getUserCountByCountry(req, res) {
    try {                            
            const userdata = await User.find().select('email country'); 
            const groupedByCountry = userdata.reduce((acc, item) => { 
                if (!acc[item.country]) { 
                    acc[item.country] = { country: item.country, count: 0 }; 
                } 
                acc[item.country].count += 1; 
                return acc; 
            }, {}); 

            const resultArray = Object.values(groupedByCountry);

            let total = resultArray.reduce((sum, item) => sum + item.count, 0);

            resultArray.forEach(item => { 
                item.label = item.country; 
                item.y = Math.round((item.count / total) * 100);                 
                delete item.count; 
                delete item.country; 
            });
            
            res.status(200).json({data:  resultArray});
        
    } catch (error) {
        logger(0, error.message, 'getUserCountByCountry');
        throw new Error('Error while login : ' + error.message);
    }
}


function isArrayEmptyOrNull(arr) {
    return !Array.isArray(arr) || arr.length === 0;
}



module.exports = { login, getUserCountByCountry };