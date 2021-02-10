const express = require ("express");
const experienceController = require("../controllers/experience");

const router = express.Router();

router.get("/home", experienceController.getExperiences);

module.exports = router;
