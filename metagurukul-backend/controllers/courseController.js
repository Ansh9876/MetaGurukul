const Course = require("../models/Course");

// Create course
const createCourse = async (req, res) => {
  try {
    const { title, description, coverImage, link } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json({ message: "Title, description and link are required" });
    }

    const newCourse = new Course({
      title,
      description,
      coverImage,
      link,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update course with modules support
const updateCourse = async (req, res) => {
  try {
    const { title, description, coverImage, link, modules, isPaid, price } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        coverImage,
        link,
        modules, // ✅ Full array overwrite
        isPaid,
        price,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete course
const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCourse, getCourses, getCourseById,updateCourse, deleteCourse };

 
