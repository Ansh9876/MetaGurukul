
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/admin/createcourse.css";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    link: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/courses", {
        title: formData.title,
        description: formData.description,
        coverImage: formData.coverImage || "https://via.placeholder.com/150",
        link: formData.link,
        isPaid: formData.isPaid === "true",
        price: formData.price || 0,
      });

      // Redirect back with the created course
      navigate("/admin-dashboard/admin-courses", { state: { newCourse: res.data } });
    } catch (err) {
      console.error(err);
      alert("Failed to create course ❌");
    }
  };

  return (
    <div className="create-course">
      <h2 className="page-title">Create New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Course Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Is Paid Course?</label>
          <select
            name="isPaid"
            value={formData.isPaid}
            onChange={handleChange}
          >
            <option value={false}>Free</option>
            <option value={true}>Paid</option>
          </select>
        </div>

        {formData.isPaid === "true" && (
          <div className="form-group">
            <label>Course Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        )}
 
        <div className="form-group">
          <label>YouTube Private Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="create-btn">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;