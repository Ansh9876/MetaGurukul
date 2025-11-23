const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

const router = express.Router();

// Admin creates a course
router.post("/", createCourse);

// Fetch all courses
router.get("/", getCourses);

// Fetch single course by ID
router.get("/:id", getCourseById);

// Update a course by ID
router.put("/:id", updateCourse);

// Delete a course by ID
router.delete("/:id", deleteCourse);

module.exports = router;
