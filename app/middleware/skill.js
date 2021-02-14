const Skill = require("../models/skill");

module.exports = (req, res, next) => {
 Skill.find((err, skills) => {
    if (!err) {
      if (skills) {
        req.skills = skills
      }
      //console.log(req.skills);
      next();
    } else {
      console.log(err);
    }
  });
}
