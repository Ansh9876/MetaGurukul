const express = require("express");
const { getAllUsers, toggleUserAccess, getUserAccessDetails, updateUserAccess } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const UserAccessModel = require("../models/UserAccessModel");

const router = express.Router();

// ✅ Only admins can access
router.get("/users", authMiddleware, async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, getAllUsers);

router.put("/toggle-access/:id", authMiddleware, async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, toggleUserAccess);

router.get("/user/:id", authMiddleware, async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
},getUserAccessDetails);

router.put("/user/:id/access", authMiddleware, async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, updateUserAccess);
module.exports = router;
