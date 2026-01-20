import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/adminprofile.css";
import axios from "axios";

const AdminProfile = () => {
  const [image, setImage] = useState(null);
  const [initial, setInitial] = useState("?");
  const [form, setForm] = useState({
    name: localStorage.getItem("name") || "Admin User",
    email: localStorage.getItem("email") || "admin@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Compute initial (from name/email)
  useEffect(() => {
    if (form.name && form.name.trim() !== "") {
      setInitial(form.name.charAt(0).toUpperCase());
    } else if (form.email) {
      setInitial(form.email.charAt(0).toUpperCase());
    }
  }, [form.name, form.email]);

  // Handle name change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Update name API call
  const handleProfileSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://metagurukul1.onrender.com/api/users/profile",
        { name: form.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("name", res.data.name);
      alert("Profile updated ✅");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile ❌");
    }
  };

  // ✅ Password change validation
  const handlePasswordSave = () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    alert("Password updated ✅");
    setForm({ ...form, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  // ✅ Account deletion confirmation
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? ❌")) {
      alert("Account deleted");
      localStorage.clear();
      window.location.href = "/signup";
    }
  };

  // ✅ Image upload (local preview only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="admin-profile-container">
      <h1>My Profile</h1>

      {/* 🖼 Profile Picture Section */}
      <div className="profile-section">
        <h3>Profile Picture</h3>
        <div className="profile-image-wrap">
          <div className="profile-avatar">
            {image ? (
              <img src={image} alt="profile" className="profile-img" />
            ) : (
              <span className="profile-initial">{initial}</span>
            )}
          </div>
          <label className="upload-btn">
            <input type="file" onChange={handleImageChange} hidden />
            📷 Upload
          </label>
        </div>
      </div>

      {/* ✏️ Update Details */}
      <div className="profile-section">
        <h3>Update Profile Details</h3>
        <label>Name :</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label>Email :</label>
        <input type="email" value={form.email} disabled />

        <button type="button" onClick={handleProfileSave}>
          Save
        </button>
      </div>

      {/* 🔒 Change Password */}
      <div className="profile-section">
        <h3>Change Password</h3>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Retype new Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button type="button" onClick={handlePasswordSave}>
          Save
        </button>
      </div>

      {/* ⚠️ Account Deletion */}
      <div className="profile-section">
        <h3>Account Deletion</h3>
        <p>
          Deleting your account will permanently remove all data. Your learners
          will lose access to your website, courses, and apps.
        </p>
        <button
          onClick={handleDeleteAccount}
          style={{ background: "red", color: "white" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
