var express = require("express");
var router = express.Router();
const Post = require("../models/post");

function checkUserSession(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    res.redirect("/users/login");
  } else if (req.isAuthenticated()) {
    next();
  }
}

/* GET home page. */
router.get("/", checkUserSession, function (req, res, next) {
  Post.find({user: req.user.username}, function(err, posts) {
    if(!err) {
        res.render("body", {posts: posts});
    }
    });
});

module.exports = router;
