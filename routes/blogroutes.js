const express = require('express');
const router = express.Router();
const Blog=require('../models/blogs');

router.get('/', (req, res) => {
   // res.send('<p>home!</p>');
   // res.sendFile('./views/index.html', {root:__dirname});
   
   Blog.find().sort({createdAt:-1})
      .then((result) => {
         res.render('index',{title:'All Blogs',blogs : result});
   })
})


router.post('/', (req, res) => {
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
router.get('/create', (req, res) => {
   res.render('create',{title:'Create a new blog'});
})
router.get('/:id', (req, res) => {
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



router.delete('/:id', (req, res) => {
   const id = req.params.id;
   Blog.findByIdAndDelete(id)
      .then((result) => {
         res.json({ redirect: '/blogs' });
      })
      .catch((err) => {
         console.log(err);
      });
})

module.exports = router;