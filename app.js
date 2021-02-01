require('dotenv').config();

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

// Authentication
const session = require("express-session");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const { Schema } = mongoose;
var app = express();

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

// Mongoose DB connection - Local
//mongoose.connect("mongodb://localhost:27017/localDB", {  useUnifiedTopology: true, useNewUrlParser: true });
// Mongoose DB connection - Cloud Atlas
mongoose.connect(process.env.MONGODB_URI, {  useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

// Mongoose Schemas
const skillSchema = new Schema({
  name : String,
  description : String,
  level : Number
});
const experienceSchema = new Schema({
  title : String,
  overview : String,
  order : Number
});
const projectSchema = new Schema({
  name: String,
  link: String,
  item: [skillSchema]
});
const userSchema = new Schema({
  email : String,
  password: String,
  googleId: String,
  secret: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Mongoose model
const Skill      = mongoose.model("Skill",      skillSchema);
const Experience = mongoose.model("Experience", experienceSchema);
const Project    = mongoose.model("Project",    projectSchema);
const User       = mongoose.model("User",       userSchema);

passport.use(User.createStrategy());

// Passport.js serialization
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//Experience Path
// const experience = new Experience ({
//   title: "Fund For Peace - Senior Software Engineer/Architect",
//   overview: "Experience Two",
//   order: 2
// })
// experience.save();


function getExperiences() {
  Experience.find((err, experiences) => {  // Checks to see secret is not equal to null
    if (!err) {
      if (experiences) {
        console.log("has experiences: " + experiences.length);
        for (var i = 0; i < experiences.length; i++) {
          console.log(experiences[i].title);
          console.log(experiences[i].overview);
        }
        // experiences.forEach(experience => {
        //   console.log(experience.title);
        //   console.log(experience.overview);
        // });
        return experiences
      }

        //res.render("secrets", {usersWithSecrets : secrets})
      //}
    } else {
      console.log(err);
    }
  });
}
//console.log(getExperiences());


app.get("/", (req, res) => {
  res.render("login");
});

app.get("/home", (req,res) => {
  if (req.isAuthenticated()) {
    Experience.find((err, experiences) => {  // Checks to see secret is not equal to null
      if (!err) {
        if (experiences) {
          res.render("home", {experiences: experiences});
        }
      } else {
        console.log(err);
      }
    });
  } else {
    res.redirect("/");
  }
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

app.get('/auth/google/home',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
  User.register({username: req.body.username}, req.body.password, (err, user) => {
     if (err) {
       console.log(err);
       res.redirect("/register");
     } else {
       passport.authenticate("local")(req, res, () => {
         res.redirect("/home");
       });
     }
  });
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", {failureRedirect : "/"})(req, res, () => {
          res.redirect("/home");
      });
    }
  })
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started succssfully on port " + port);
});
