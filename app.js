const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
var flash = require('connect-flash');
const passport = require("passport");
const indexRouter = require(`${__dirname}/routes/index`);
const usersRouter = require(`${__dirname}/routes/users`);
const controlsRouter = require(`${__dirname}/routes/controls`);

const app = express();

require("./config/passport")();

mongoose.connect("mongodb+srv://admin-angela:Test123@cluster0-9peap.mongodb.net/journal", {useNewUrlParser: true,
useUnifiedTopology: true,});
mongoose.set("useCreateIndex", true);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(flash());

// Creating Post schema
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String}
    
});

app.use(
    cookieSession({
      maxAge: 14400,
      keys: ["HELLODEARLPEOPLEFROMYOUTUBE"]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());

  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/controls", controlsRouter);



// Deployed on Heroku
app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started successfully");
  });