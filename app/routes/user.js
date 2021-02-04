const express = require ("express");
var passport = require('passport');
const User = require("../models/user");
const Experience = require("../models/experience");

const router = express.Router();

router.get('/auth/github',
  passport.authenticate('github', {
    scope: ['user']
  })); //user:email'

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/auth/google/home',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });


router.get("/", (req, res) => {
  res.render("login");
});

router.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    Experience.find((err, experiences) => { // Checks to see secret is not equal to null
      if (!err) {
        if (experiences) {
          res.render("home", {
            experiences: experiences
          });
        }
      } else {
        console.log(err);
      }
    });
  } else {
    res.redirect("/");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  User.register({
    username: req.body.username
  }, req.body.password, (err, user) => {
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

router.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", {
        failureRedirect: "/"
      })(req, res, () => {
        res.redirect("/home");
      });
    }
  })
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
