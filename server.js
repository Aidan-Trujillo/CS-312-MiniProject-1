var express = require('express');
var app = express();
var path = require('path');

// set view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/Website'));
app.use(express.urlencoded({ extended: true }));


// index page (where blog shows up)
app.get('/', function(req,res) {
    res.render('index', { 
        title: 'Blog Page', 
        message: 'Welcome to my Blog page!' });
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