const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs');
const User = require('../models/users');

var userName = '';
var userEmail = '';
var blogs = '';
router.get('/about', (req, res) => {
   // res.send('<p>about!</p>');
   // res.sendFile('./views/about.html', {root:__dirname});

   res.render('about', { currentPage: 'about', title: 'About', userName });
   next();
})
router.post('/', (req, res) => {
   // console.log(req.body);
   const data = {
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      email: userEmail
   }
   const blog = new Blog(data);
   blog.save()
      .then((result) => {
         res.redirect('/blogs');
      })
      .catch((err) => {
         console.log(err);
      });
})
router.get('/create', (req, res) => {
   res.render('create', { currentPage: 'create', title: 'Create a new blog', userName });
})

router.get('/signin', (req, res) => {
   res.render('signin', { currentPage: 'signin', title: 'Sign in', userName, message: '', newaccount: '' });
});

router.post('/signin', (req, res) => {
   const { email, password } = req.body;

   User.findOne({ email })
      .then((result) => result)
      .then((result) => {
         if (result.password === password) {
            userName = result.name;
            userEmail = result.email;
            return res.redirect('/blogs');
         }
         else {
            return res.render('signin', { currentPage: 'signin', title: 'Sign in', userName, message: 'Password is incorrect!', newaccount: '' });
         }
      })
      .catch((err) => {
         return res.render('signin', { currentPage: 'signin', title: 'Sign in', userName, message: 'User not exist!', newaccount: 'create a new account' });
      });
});

router.get('/signup', (req, res) => {
   res.render('signup', { currentPage: 'signup', title: 'Sign up', userName, message: '', newaccount: '' });
});

router.post('/signup', (req, res) => {
   const user = new User(req.body);
   // console.log(`${user.email}`);
   const email = req.body.email;
   User.findOne({ email })
      .then((result) => result)
      .then((result) => {
         res.render('signup', { currentPage: 'signup', title: 'Sign up', userName, message: 'User is already registered!', newaccount: 'Log in' });
      })
      .catch((err) => {
         user.save()
            .then((result) => {
               res.render('signup', { currentPage: 'signup', title: 'Sign up', userName, message: 'Account Created!', newaccount: 'Log in' });
            })
            .catch((err) => {
               console.log(err);
            });
      });

   // user.save()
   //    .then((result) => {
   //       res.render('signup', { currentPage: 'signup', title: 'Sign up', userName, message: 'Account Created!', newaccount: 'Log in' });
   //    })
   //    .catch((err) => {
   //       console.log(err);
   //    });
});
router.get('/signout', (req, res) => {
   userName = '';
   userEmail = '';
   res.redirect('/');
});
router.get('/', (req, res) => {
   // res.send('<p>home!</p>');
   // res.sendFile('./views/index.html', {root:__dirname});

   Blog.find().sort({ createdAt: -1 })
      .then((result) => {
         res.render('index', {blog_id:'', currentPage: '/', details:'no', message: '', title: 'All Blogs', blog: '', userName, blogs: result });
      })
})

router.get('/:id', (req, res) => {
   const id = req.params.id;
   // console.log(id);
   Blog.find().sort({ createdAt: -1 })
      .then((result) => {
         blogs = result;
      })
   Blog.findById(id)
      .then((result) => {
         res.render('index', {blog_id:id, currentPage: 'details', details:'yes', message: '', blog: result,blogs, title: 'Blog Details', userName });
      })
      .catch((err) => {
         console.log(err);
      });
})

router.get('/userhome', (req, res) => {
   Blog.find({ email: userEmail }).sort({ createdAt: -1 })
      .then((result) => {
         res.render('userhome', { currentPage: 'userhome', title: userName, userName, blogs: result });
      })
});






router.get('/delete/:id', (req, res) => {
   const id = req.params.id;
   Blog.deleteOne({ _id: id, email: userEmail })
      .then((result) => {
         if (result.deletedCount > 0)
            res.redirect('/blogs');
         else {
            Blog.findById(id)
               .then((result) => {
                  res.render('details', { currentPage: 'details', message: 'You do not have permission to delete this blog!', blog: result, title: 'Blog Details', userName });
               })
         }
      })
      .catch((err) => {
         console.log(err);
      });
})
// router.delete('/:id', (req, res) => {
//    const id = req.params.id;
//    Blog.findByIdAndDelete(id)
//       .then((result) => {
//          res.json({ redirect: '/blogs' });
//       })
//       .catch((err) => {
//          console.log(err);
//       });
// })

module.exports = router;