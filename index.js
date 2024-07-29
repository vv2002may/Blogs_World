require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');
const blogRoutes = require('./routes/blogroutes.js');
// const Blog=require('./models/blogs');

const app = express();

// connect to MongoDB
// const dbURI = 'mongodb+srv://vv2002may:3256@cluster0.euxeilh.mongodb.net/blog_world';

mongoose.connect(process.env.mongourl)
   .then(function (result) {
      app.listen(3000, () => console.log('Server is running on port 3000'))
      console.log('connected to DB', 'http://localhost:3000/')
   })
   .catch((err) => console.log(err));
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

// Middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes


app.get('/', (req, res) => res.redirect('/blogs'));

app.use('/blogs', blogRoutes);



// 404 page
// runs for every req not found above
app.use((req, res) => {
   res.render('404', { title: '404' });
})

// module.exports = app;