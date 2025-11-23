const Bundle = require("../models/Bundle");

// ✅ Create Bundle
exports.createBundle = async (req, res) => {
  try {
    const { title, description, coverImage, courses } = req.body;
    const bundle = new Bundle({ title, description, coverImage, courses });
    await bundle.save();
    res.status(201).json(bundle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Bundles
exports.getBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find().populate("courses", "title coverImage");
    res.json(bundles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Bundle
exports.deleteBundle = async (req, res) => {
  try {
    await Bundle.findByIdAndDelete(req.params.id);
    res.json({ message: "Bundle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Bundle
exports.updateBundle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, coverImage, courses } = req.body;

    const updatedBundle = await Bundle.findByIdAndUpdate(
      id,
      { title, description, coverImage, courses },
      { new: true }
    ).populate("courses", "title coverImage");

    if (!updatedBundle) {
      return res.status(404).json({ message: "Bundle not found" });
    }

    res.json(updatedBundle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
