const express = require("express");
const passport = require('passport');
const userController = require("../controllers/user");
const experienceController = require("../controllers/experience");

const router = express.Router();

// Github OAuth authentication
router.get('/auth/github',
  passport.authenticate('github', {
    scope: ['user']
  })); //user:email'

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

// Google OAuth authentication
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

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/home", experienceController.getExperiences);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
