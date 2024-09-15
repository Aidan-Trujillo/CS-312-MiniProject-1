// server to handle backend of a blog website

// dependencies
const { readPosts, addPost } = require('./utils');
const {PostsPath} = require('./constants.js')


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

        res.render('index', { 
            title: 'Blog Page', 
            message: 'Welcome to my Blog page!', 
            posts: posts,
            category: "All"});
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error processing the form');
    }
});


// post page (making a blog post)
app.post('/submit', async (req,res) => {
    // get the time
    const dateTimeFull = Date().toLocaleString().split(' ');
    const dateTime = dateTimeFull.slice(0, 5); 

    console.log(dateTime);

    // get post and add time
    var post = req.body;
    post.time = dateTime.join(' ');

    addPost(PostsPath, post);
    
    res.redirect('/');
});


// change category logic
app.get('/posts', async (req,res) => {
    // get the category
    const category = req.query.category

    // get all posts
    var posts = await readPosts(PostsPath);
    // filter out posts if they do not have category as All
    if (category !== "All"){
        posts = posts.filter(post => post.category === category)
    } 

    res.render('index', { 
        title: 'Blog Page', 
        message: 'Welcome to my Blog page!', 
        posts: posts,
        category: category});
    
});


app.listen(8080);
console.log('Server is listening on port 8080');