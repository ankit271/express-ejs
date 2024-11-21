const express = require('express');
const session = require('express-session');
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

const connect = require('./config/connection');

connect();

app.get('/', (req, res) => {  
  res.render('layout', { title: 'Home', message: '',greet: '', content: './userlanding/login' }); // Renders the index.ejs file
});

app.get('/api/contact', (req, res) => {  
  res.render('layout', { title: 'Contact',email: req.session.email, content: './userlanding/contact' }); // Renders the index.ejs file
});


const userRoute = require("./routes/users");
const loginRoute = require("./routes/login");

app.use('/api/user', userRoute);
app.use('/api/login', loginRoute);



app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})