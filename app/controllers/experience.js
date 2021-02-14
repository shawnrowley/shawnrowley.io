const Experience = require("../models/experience");

exports.getExperiences = (req, res) => {
  if (req.isAuthenticated()) {
    Experience.find((err, experiences) => {
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
}

exports.showExperiences = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.experiences) {
      res.render("home", {
        experiences: req.experiences,
        skills: req.skills
      });
    } else {
      console.log("No experiences available");
      res.render("/");
    }
  } else {
    res.redirect("/");
  }
}
