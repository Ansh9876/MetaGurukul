const express = require("express");
const { getProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const {  addActiveCourse,updateProgress } = require("../controllers/userController");
const {getAccessStatus} = require("../controllers/userController");

const router = express.Router();

// Get profile
router.get("/profile", authMiddleware, getProfile);

// Update profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
 
 
router.get("/access-status", authMiddleware, getAccessStatus);
module.exports = router;
 
