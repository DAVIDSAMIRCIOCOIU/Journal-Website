const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/Journal', {useNewUrlParser: true});


// Creating Post schema
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: []}
});

const Post = new mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    const posts = [];
    res.render("body", {posts: posts});
});

const port = 3000;
app.listen(port, () => {
    console.log("Server started successfully on port: " + port);
});