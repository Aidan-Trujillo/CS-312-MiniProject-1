const fs = require('fs');
const {PostsPath} = require('./constants.js');
const { json } = require('express');

// function that outputs an array of blog posts
const readPosts = async (filePath) => {
    try{
        const data = await fs.promises.readFile(filePath, 'utf8');
        jsonData = JSON.parse(data);
        
        // get into array format if not
        if (data[0] !== '['){
            return [jsonData]
        }

        return jsonData

    } catch (err) {
        console.error('Error reading file: ', err)
        // send black blank file
        return []
    }
};

const addPost = async (filePath, post) => {
    // get list of posts
    const posts = await readPosts(PostsPath);
    posts.push(post);
    const formattedData = JSON.stringify(posts, null, 2);

    await fs.promises.writeFile(filePath, formattedData, (err) => {
        if (err) throw err;
        console.log("added " +data+ " to blogPost");
    });
};


module.exports = {
    readPosts,
    addPost
}