const User = require("../models/user");
const passport = require("passport");

exports.registerUser = (req, res) => {
  User.register({
    username: req.body.username,
    email: req.body.username
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
}

exports.loginUser = (req, res) => {
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
}
