const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get user access status
exports.getAccessStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("hasFullAccess name email");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ hasFullAccess: user.hasFullAccess });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

