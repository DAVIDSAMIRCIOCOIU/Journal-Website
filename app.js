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

app.get("/", (req, res) => {
    res.render("body");
});

const port = 3000;
app.listen(port, () => {
    console.log("Server started successfully on port: " + port);
});