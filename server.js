// server to handle backend of a blog website

// dependencies
const { readPosts, addPost } = require('./utils');

// constants
const PostsPath = './blogPosts.txt';

// server initialization
var express = require('express');
var fs = require('fs');
var path = require('path');

// start app
var app = express();

// set view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/Website'));
app.use(express.urlencoded({ extended: true }));





// index page (where blog shows up)
app.get('/', async (req,res) => {
    try{
        // get all posts
        const posts = await readPosts(PostsPath);
        console.log(posts);
        res.render('index', { 
            title: 'Blog Page', 
            message: 'Welcome to my Blog page!' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error processing the form');
    }
});

// post page (making a blog post)
app.get('/post', function(req,res) {
    res.render('post');
});

// post page (making a blog post)
app.post('/submit', function(req,res) {
    const { name, title, category, message } = req.body;
    console.log(req.body)
    res.render('index', { 
        title: 'Blog Page', 
        message: 'Thank you for submitting your post, ' + name + '!! Post again?'});
});


app.listen(8080);
console.log('Server is listening on port 8080');