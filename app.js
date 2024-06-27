const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');
const blogRoutes = require('./routes/blogroutes.js');

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://vv2002may:3256@cluster0.euxeilh.mongodb.net/blog_world?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
   .then((result) => console.log('connected to db'))
   .catch((err) => console.log(err));
   app.listen(3000)
// register view engine
app.set('view engine', 'ejs');

// listen for request
// app.listen(3000);

// app.use((req, res, next) => {
//    console.log("New Request Made : ");
//    console.log('Host : ', req.hostname);
//    console.log('Path : ', req.path);
//    console.log('Method : ', req.method, '\n');
//    next();
// })

// static files
app.use(express.static('public'));

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

// routes


app.get('/', (req, res) => res.redirect('/blogs'));
app.get('/about', (req,res) => {
   // res.send('<p>about!</p>');
   // res.sendFile('./views/about.html', {root:__dirname});

   res.render('about',{title:'About'});
})

// blog routes
app.use('/blogs',blogRoutes);

// redirects
// app.get('/aboutme', (req, res) => {
//    res.redirect('/about');
// })

// 404 page
// runs for every req not found above
app.use((req, res) => {
   // res.status(404).sendFile('./views/404.html',{root:__dirname})

   res.render('404',{title:'404'});
})