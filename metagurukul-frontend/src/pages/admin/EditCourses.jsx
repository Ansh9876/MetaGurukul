import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/admin/editcourse.css";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    coverImage: "",
    link: "",
    modules: [],
    isPaid: false,
    price: 0,
  });

  // ✅ Fetch existing course data
  useEffect(() => {
  const fetchCourse = async () => {
    try {
      const res = await axios.get(`https://metagurukul1.onrender.com/api/courses/${id}`);
      const c = res.data;

      setCourse({
        title: c.title || "",
        description: c.description || "",
        coverImage: c.coverImage || "",
        link: c.link || "",
        modules:
          Array.isArray(c.modules) && c.modules.length > 0
            ? c.modules
            : [{ moduleNumber: 1, title: "", videoLink: "" }],
        isPaid: !!c.isPaid,
        price: c.price || 0,
      });
    } catch (err) {
      console.error("Error loading course:", err);
      alert("❌ Failed to load course details!");
    }
  };

  fetchCourse();
}, [id]);


  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for boolean
    if (name === "isPaid") {
      setCourse({ ...course, [name]: value === "true" });
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  // ✅ Handle module field changes
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...course.modules];
    updatedModules[index][field] = value;
    setCourse({ ...course, modules: updatedModules });
  };

  // ✅ Add a new module
  const addModule = () => {
    setCourse({
      ...course,
      modules: [
        ...course.modules,
        {
          moduleNumber: course.modules.length + 1,
          title: "",
          videoLink: "",
        },
      ],
    });
  };

  // ✅ Remove a module
  const removeModule = (index) => {
    const updatedModules = [...course.modules];
    updatedModules.splice(index, 1);
    setCourse({ ...course, modules: updatedModules });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const updatedCourse = {
      title: course.title,
      description: course.description,
      coverImage: course.coverImage,
      link: course.link,
      modules: course.modules, // ✅ Ensure modules array is sent
      isPaid: course.isPaid,
      price: course.price,
    };

    await axios.put(`https://metagurukul1.onrender.com/api/courses/${id}`, updatedCourse);
    alert("✅ Course updated successfully!");
    navigate("/admin-dashboard/admin-courses");
  } catch (err) {
    console.error("Error saving course:", err);
    alert("❌ Failed to update course");
  }
};
  return (
    <div className="edit-course">
      <h2 className="page-title">Edit Course</h2>

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={course.coverImage}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Main Course Video Link</label>
          <input
            type="text"
            name="link"
            value={course.link}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Is Paid Course?</label>
          <select
            name="isPaid"
            value={course.isPaid.toString()}
            onChange={handleChange}
          >
            <option value="false">Free</option>
            <option value="true">Paid</option>
          </select>
        </div>

        {course.isPaid && (
          <div className="form-group">
            <label>Course Price (₹)</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              min="0"
            />
          </div>
        )}

        <h3>Modules</h3>
        {course.modules.length === 0 && (
          <p style={{ color: "#666" }}>No modules yet. Add some!</p>
        )}

        {course.modules.map((mod, index) => (
          <div key={index} className="module-box">
            <h4>Module {mod.moduleNumber}</h4>
            <input
              type="text"
              value={mod.title}
              onChange={(e) =>
                handleModuleChange(index, "title", e.target.value)
              }
              placeholder="Module Title"
            />
            <input
              type="text"
              value={mod.videoLink}
              onChange={(e) =>
                handleModuleChange(index, "videoLink", e.target.value)
              }
              placeholder="Module Video Link"
            />
            <button
              type="button"
              onClick={() => removeModule(index)}
              className="delete-btn"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="form-actions">
          <button type="button" onClick={addModule} className="create-btn">
            + Add Module
          </button>
          <button type="submit" className="create-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
