const express = require ("express");
const skillController = require("../controllers/skill");

const router = express.Router();

router.get("", skillController.getSkills);
router.get("/:id", skillController.getSkillById)

module.exports = router;
