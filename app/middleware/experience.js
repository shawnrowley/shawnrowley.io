const Experience = require("../models/experience");

module.exports = (req, res, next) => {
  Experience.find((err, experiences) => {
    if (!err) {
      if (experiences) {
        req.experiences = experiences
      }
      //.log(req.experiences);
      next();
    } else {
      console.log(err);
    }
  });
}
