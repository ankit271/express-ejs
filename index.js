const express = require('express');
const session = require('express-session');
const connect = require('./config/connection');
const path = require('path');
const app = new express();
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({ extended : false}))
app.use(express.json());

const PORT = process.env.PORT;

connect();

app.get('/user', (req, res) => {
    res.send('Hello World!');
});

const productRouter = require('./routes/product');

app.use('/api/product', productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});