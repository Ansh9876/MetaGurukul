const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { saveProgress, getProgress } = require("../controllers/progressController");

// Save video progress
router.post("/save", auth, saveProgress);

// Get saved progress
router.get("/:courseId", auth, getProgress);

module.exports = router;
