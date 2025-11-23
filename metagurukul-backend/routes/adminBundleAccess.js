const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Admin: Update access for a specific bundle
router.put("/update-bundle-access/:userId", authMiddleware, async (req, res) => {
  try {
    const { bundleId, hasAccess, startDate, endDate } = req.body;

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if bundle already exists in user's access list
    const existingBundle = user.bundleAccess.find(
      (b) => b.bundleId.toString() === bundleId
    );

    if (existingBundle) {
      existingBundle.hasAccess = hasAccess;
      existingBundle.startDate = startDate;
      existingBundle.endDate = endDate;
    } else {
      user.bundleAccess.push({ bundleId, hasAccess, startDate, endDate });
    }

    await user.save();
    res.json({ message: "Bundle access updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
