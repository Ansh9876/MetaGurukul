const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleNumber: Number,
  title: String,
  videoLink: String,
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: "" },
    link: { type: String, required: true },
    modules: [moduleSchema],

    // 🆕 Paid Course Feature
    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
