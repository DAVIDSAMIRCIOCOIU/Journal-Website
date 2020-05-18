const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
var showToast = require("show-toast");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-angela:Test123@cluster0-9peap.mongodb.net/journal", {useNewUrlParser: true});


// Creating Post schema
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String}
    
});

const Post = new mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    const posts = [];
    Post.find({}, function(err, posts) {
        if(!err) {
            res.render("body", {posts: posts});
        }
    });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/delete", (req, res) => {
    Post.findByIdAndRemove(req.body.buttondelete, function(err) {
        if(!err) {
            console.log("Removed");
            res.redirect("/");
        }
    });
});

app.post("/compose", (req, res) => {
    console.log('I am here');
    const post = new Post( {
        title: req.body.title,
        body: req.body.body
    });

    post.save(function (err) {
        if(!err) {
            console.log('Your data has been saved!');
            res.redirect("/");
            
        } else {
            alert("There's been an error saving your data.");
            console.log('Error saving data');
        }
    });
});



// Deployed on Heroku
app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started successfully");
  });