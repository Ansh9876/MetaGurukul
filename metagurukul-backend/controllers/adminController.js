const User = require("../models/User");
const UserAccess = require("../models/UserAccessModel");


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

exports.getUserAccessDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const access = await UserAccess.find({ userId });

    res.json({ user, access });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user access" });
  }
};

exports.updateUserAccess = async (req, res) => {
  try {
    const userId = req.params.id;
    const accessList = req.body.access;

    // 🔥 Remove old access
    await UserAccess.deleteMany({ userId });

    // 🔥 Save new access
    const newAccess = accessList.map((a) => ({
      userId,
      type: a.type,
      itemId: a.itemId,
      from: a.from,
      to: a.to,
      enabled: a.enabled,
    }));

    await UserAccess.insertMany(newAccess);

    res.json({ message: "Access updated", access: newAccess });
  } catch (err) {
    res.status(500).json({ message: "Error saving access" });
  }
};