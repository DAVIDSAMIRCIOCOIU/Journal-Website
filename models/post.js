const mongoose = require("mongoose");




// Creating Post schema
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String}
    
});


const Post = new mongoose.model("Post", postSchema);
 module.exports = Post;
