import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/pages/admin/adminbundles.css";

const AdminBundles = () => {
  const [bundles, setBundles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    selectedCourses: [],
  });

  const [showForm, setShowForm] = useState(true);
  const [showCourses, setShowCourses] = useState(false);
  const [showBundles, setShowBundles] = useState(true);

  // ✅ Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bundleRes, courseRes] = await Promise.all([
          axios.get("http://localhost:5000/api/bundles"),
          axios.get("http://localhost:5000/api/courses"),
        ]);
        setBundles(bundleRes.data);
        setCourses(courseRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Course select
  const handleCourseSelect = (id) => {
    setFormData((prev) => {
      const selected = prev.selectedCourses.includes(id)
        ? prev.selectedCourses.filter((c) => c !== id)
        : [...prev.selectedCourses, id];
      return { ...prev, selectedCourses: selected };
    });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/bundles/${editId}`, {
          ...formData,
          courses: formData.selectedCourses,
        });
        alert("✅ Bundle updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/bundles", {
          ...formData,
          courses: formData.selectedCourses,
        });
        alert("✅ Bundle created successfully!");
      }
      window.location.reload();
    } catch (err) {
      console.error("Bundle save error:", err);
      alert("❌ Something went wrong!");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bundle?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bundles/${id}`);
      setBundles(bundles.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting bundle:", error);
    }
  };

  // ✅ Edit
  const handleEdit = (bundle) => {
    setIsEditing(true);
    setEditId(bundle._id);
    setFormData({
      title: bundle.title,
      description: bundle.description,
      coverImage: bundle.coverImage,
      selectedCourses: bundle.courses.map((c) => c._id),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ title: "", description: "", coverImage: "", selectedCourses: [] });
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-bundles">
      <div className="collapsible-section">
        <div className="collapsible-header" onClick={() => setShowForm(!showForm)}>
          <h2>{isEditing ? "✏️ Edit Bundle" : "📦 Create New Bundle"}</h2>
          <span>{showForm ? "▲" : "▼"}</span>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bundle-form fade-in">
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Bundle Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="coverImage"
                placeholder="Cover Image URL"
                value={formData.coverImage}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="description"
              placeholder="Bundle Description"
              value={formData.description}
              onChange={handleChange}
            />

            <div className="collapsible-section">
              <div
                className="collapsible-header"
                onClick={() => setShowCourses(!showCourses)}
              >
                <h4>📚 Select Courses</h4>
                <span>{showCourses ? "▲" : "▼"}</span>
              </div>

              {showCourses && (
                <div className="fade-in">
                  <input
                    type="text"
                    placeholder="🔍 Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                  />

                  <div className="course-grid">
                    {filteredCourses.map((course) => (
                      <div
                        key={course._id}
                        className={`course-item ${
                          formData.selectedCourses.includes(course._id)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleCourseSelect(course._id)}
                      >
                        <img src={course.coverImage} alt={course.title} />
                        <p>{course.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="form-buttons">
              <button type="submit" className="create-btn">
                {isEditing ? "Update Bundle" : "Create Bundle"}
              </button>
              {isEditing && (
                <button type="button" className="cancel-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Collapsible Bundles Section */}
      <div className="collapsible-section">
        <div className="collapsible-header" onClick={() => setShowBundles(!showBundles)}>
          <h3>🗂 Existing Bundles</h3>
          <span>{showBundles ? "▲" : "▼"}</span>
        </div>

        {showBundles && (
          <div className="bundle-grid fade-in">
            {bundles.map((b) => (
              <div className="bundle-card" key={b._id}>
                <img src={b.coverImage} alt={b.title} />
                <div className="bundle-content">
                  <h4>{b.title}</h4>
                  <p>{b.description}</p>
                  <p>
                    <strong>Courses:</strong> {b.courses.map((c) => c.title).join(", ")}
                  </p>
                  <div className="bundle-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(b)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(b._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBundles;
