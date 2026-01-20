const mongoose = require("mongoose");

const AccessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["course", "bundle"], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  from: { type: String, default: "" },
  to: { type: String, default: "" },
  enabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("UserAccess", AccessSchema);
