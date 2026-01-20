import React, { useEffect, useState } from "react";
import "../../styles/pages/user/userprofile.css";
import axios from "axios";

const UserProfile = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "User");
  const [email] = useState(localStorage.getItem("email") || "user@example.com");
  const [profileImage, setProfileImage] = useState(null);
  const [initial, setInitial] = useState("?");
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  // Set initial letter from name or email
  useEffect(() => {
    if (name && name.trim() !== "") setInitial(name.charAt(0).toUpperCase());
    else if (email) setInitial(email.charAt(0).toUpperCase());
  }, [name, email]);

  // --- Profile Image Upload (frontend preview only for now) ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // --- Update Profile Details ---
  const handleProfileSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://metagurukul1.onrender.com/api/users/profile",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("name", res.data.name);
      alert("Profile updated ✅");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile ❌");
    }
  };

  // --- Change Password ---
  const handlePasswordChange = () => {
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert("Passwords do not match ❌");
      return;
    }
    alert("Password updated ✅");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
  };

  // --- Delete Account ---
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? ❌")) {
      alert("Account deleted successfully");
      localStorage.clear();
      window.location.href = "/signup";
    }
  };

  return (
    <div className="user-profile-container">
      <h1>My Profile</h1>

      {/* Profile Image */}
      <div className="profile-section">
        <h3>Profile Picture</h3>
        <div className="profile-image-wrap">
          <div className="profile-avatar">
            {profileImage ? (
              <img src={profileImage} alt="profile" className="profile-img" />
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

      {/* Profile Details */}
      <div className="profile-section">
        <h3>Update Profile Details</h3>
        <label>Name :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email :</label>
        <input type="email" value={email} disabled />

        <button type="button" onClick={handleProfileSave}>
          Save
        </button>
      </div>

      {/* Change Password */}
      <div className="profile-section">
        <h3>Change Password</h3>
        <input
          type="password"
          name="current"
          placeholder="Current Password"
          value={passwordForm.current}
          onChange={(e) =>
            setPasswordForm({ ...passwordForm, current: e.target.value })
          }
        />
        <input
          type="password"
          name="newPass"
          placeholder="New Password"
          value={passwordForm.newPass}
          onChange={(e) =>
            setPasswordForm({ ...passwordForm, newPass: e.target.value })
          }
        />
        <input
          type="password"
          name="confirm"
          placeholder="Retype new Password"
          value={passwordForm.confirm}
          onChange={(e) =>
            setPasswordForm({ ...passwordForm, confirm: e.target.value })
          }
        />
        <button type="button" onClick={handlePasswordChange}>
          Save
        </button>
      </div>

      {/* Account Deletion */}
      <div className="profile-section">
        <h3>Account Deletion</h3>
        <p>
          By deleting your account, all your progress, course access, and data
          will be permanently lost.
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

export default UserProfile;
