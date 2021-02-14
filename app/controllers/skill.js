const Skill = require("../models/skill");

exports.getSkills = (req, res) => {
  if (req.isAuthenticated()) {
    Skill.find((err, skills) => {
      if (!err) {
        if (skills) {
          console.log(skills);
          res.status(200).json(skills);
        }
      } else {
        console.log(err);
      }
    });
  } else {
    res.redirect("/");
  }
}

exports.getSkillById = (req, res) => {
  if (req.isAuthenticated()) {
    Skill.findById(req.params.id)
      .then(skill => {
        if (skill) {
          res.status(200).json(skill);
        } else {
          res.status(400).json({
            message: 'skill not found'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Unable to retrieve skill"
        });
      });
  } else {
    res.redirct("/");
  }
}
