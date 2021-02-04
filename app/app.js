require('dotenv').config();

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const session = require("express-session");
const passport = require("passport");
const routes = require("./routes/user");
var app = express();

// Mongoose DB connection - Local
//mongoose.connect("mongodb://localhost:27017/localDB", {  useUnifiedTopology: true, useNewUrlParser: true });
// Mongoose DB connection - Cloud Atlas
mongoose.connect(process.env.MONGODB_URI, {  useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

//app use
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});
app.use("", routes);


var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var User = require("./models/user");

// Passport.js serialization
passport.serializeUser(function(user, done) {
  // console.log(user);
  done(null, user);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(User.createStrategy());
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ username: profile.emails[0].value, googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate({ username: profile.emails[0].value, githubId: profile.id }, function (err, user) {
      // if (!err) {
      //   console.log(user)
      // } else {
      //   console.log(err);
      // }
      return done(err, user);
    });
  }
));

module.exports = app;
