require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const session = require("express-session");
const passport = require("passport");
const routes = require("./routes/user");
const skillroutes = require("./routes/skill");
var app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

//app use
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
app.use("", routes);
app.use("/skills", skillroutes);

var GoogleStrategy = require("passport-google-oauth2").Strategy;
var GitHubStrategy = require("passport-github2").Strategy;
var User = require("./models/user");

// Passport.js serialization
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(User.createStrategy());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { username: profile.id,
          email: profile.emails[0].value,
          googleId: profile.id },
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { username: profile.id,
          email: profile.emails[0].value,
          githubId: profile.id },
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

//Skill
// const Skill = require("./models/skill");
// const skill = new Skill ({
//   name : "MacOS",
//   description : "description of MacOS skills",
//   level : 4,
//   type  : 0,
//   graphic: "fa-apple"
// });
// skill.save();

//Experience Path
// const Experience = require("./models/experience");
// const exp = new Experience ({
//   title : "Software Consultant/Developer - Maxim Group Consulting",
//   overview : "dfsdfsdfsdfsd",
//   order : 9
// });
// exp.save();

module.exports = app;
