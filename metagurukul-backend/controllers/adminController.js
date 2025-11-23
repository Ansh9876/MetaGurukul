const User = require("../models/User");

// ✅ Get all users (except admins)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Toggle user access (enable/disable)
exports.toggleUserAccess = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.hasFullAccess = !user.hasFullAccess; // flip the value
    await user.save();

    res.json({
      message: `User access ${user.hasFullAccess ? "enabled" : "disabled"}`,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
