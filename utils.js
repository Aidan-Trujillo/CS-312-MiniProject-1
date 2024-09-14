const fs = require('fs');

const readPosts = async (filePath) => {
    console.log(filePath)
    try{
        console.log('\n\n\nAttempting to read file')
        const data = await fs.promises.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading file: ', err)
    }
};

const addPost = (filePath, data) => {
    fs.promises.appendFile(filePath, data + '\n', (err) => {
        if (err) throw err;
        console.log("added " +data+ " to blogPost");
    });
};


module.exports = {
    readPosts,
    addPost
}