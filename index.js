const express = require('express');
const session = require('express-session');
const greet = require('./utils/greet');
//const { addCountryField } = require('./migration/user_291124');

const path = require('path');
const app = new express();
const PORT = process.env.PORT;

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views',path.resolve('./views'));

app.use(session({
    secret: process.env.KEY, // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use((req, res, next) => {    
    res.locals.commonData = greet    
    next();
});
const connect = require('./config/connection');

connect();

app.get('/', (req, res) => {  
  res.render('layout', { title: 'Home', message: '',greet: res.locals.commonData.getGreeting(), content: './userlanding/login' }); // Renders the index.ejs file
});

app.get('/api/contact', (req, res) => {  
  res.render('layout', { title: 'Contact',email: req.session.email, content: './userlanding/contact' }); // Renders the index.ejs file
});


const userRoute = require("./routes/users");
const loginRoute = require("./routes/login");

app.use('/api/user', userRoute);
app.use('/api/login', loginRoute);

// addCountryField().then(() => {
//     console.log('Function executed successfully.');
// }).catch((error) => {
//     console.error('Error executing function:', error);
// });

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})