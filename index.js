const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');
// const blogRoutes = require('./routes/blogroutes.js');
const Blog=require('./models/blogs');


// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://vv2002may:3256@cluster0.euxeilh.mongodb.net/blog_world?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
   .then((result) => console.log('connected to db','http://localhost:3000/'))
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
// app.use('/blogs',blogRoutes);

app.get('/blogs', (req, res) => {
   res.send('<p>home!</p>');
   // res.sendFile('./views/index.html', {root:__dirname});
   // Blog.find().sort({createdAt:-1})
   //    .then((result) => {
   //       res.render('index',{title:'All Blogs',blogs : result});
   // })
})


app.post('/blogs', (req, res) => {
   // console.log(req.body);
   const blog = new Blog(req.body);
   blog.save()
      .then((result) => {
         res.redirect('/blogs');
      })
      .catch((err) => {
         console.log(err);
      });
})
app.get('/blogs/create', (req, res) => {
   res.render('create',{title:'Create a new blog'});
})
app.get('/blogs/:id', (req, res) => {
   const id = req.params.id;
   // console.log(id);
   Blog.findById(id)
      .then((result) => {
         res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch((err) => {
         console.log(err);
      });
})



app.delete('/blogs/:id', (req, res) => {
   const id = req.params.id;
   Blog.findByIdAndDelete(id)
      .then((result) => {
         res.json({ redirect: '/blogs' });
      })
      .catch((err) => {
         console.log(err);
      });
})




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