const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // ✅ New field
    whatsNumber: {
      type: String,
      required: true,
    },
    courseProgress: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        moduleIndex: { type: Number, default: 0 },
        currentTime: { type: Number, default: 0 },
        completedModules: [{ type: Number }],
      },
    ],
    hasFullAccess: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
