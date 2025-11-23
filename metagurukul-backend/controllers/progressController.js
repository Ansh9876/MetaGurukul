const User = require("../models/User");

// ✅ Save video progress
exports.saveProgress = async (req, res) => {
  try {
    const { courseId, moduleIndex, currentTime, completedModules } = req.body;
    const userId = req.user.id; // from auth middleware

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const progressIndex = user.courseProgress.findIndex(
      (p) => p.courseId.toString() === courseId
    );

    if (progressIndex > -1) {
      // Update existing progress
      user.courseProgress[progressIndex].moduleIndex = moduleIndex;
      user.courseProgress[progressIndex].currentTime = currentTime;
      user.courseProgress[progressIndex].completedModules = completedModules || [];
    } else {
      // Add new progress entry
      user.courseProgress.push({
        courseId,
        moduleIndex,
        currentTime,
        completedModules,
      });
    }

    await user.save();
    res.json({ message: "Progress saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving progress", error: err.message });
  }
};

// ✅ Get video progress for a course
exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const user = await User.findById(userId).select("courseProgress");
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = user.courseProgress.find(
      (p) => p.courseId.toString() === courseId
    );

    res.json(progress || {});
  } catch (err) {
    res.status(500).json({ message: "Error fetching progress", error: err.message });
  }
};
