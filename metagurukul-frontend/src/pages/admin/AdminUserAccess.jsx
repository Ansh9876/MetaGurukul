import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/pages/admin/useraccess.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminUserAccess = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [access, setAccess] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const userRes = await axios.get(
        `http://localhost:5000/api/admin/user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const courseRes = await axios.get("http://localhost:5000/api/courses");
      const bundleRes = await axios.get("http://localhost:5000/api/bundles");

      setUser(userRes.data.user);
      setAccess(userRes.data.access);
      setCourses(courseRes.data);
      setBundles(bundleRes.data);
    } catch (err) {
      console.error("Error loading access:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAccess = (item, type, field, value) => {
    setAccess((prev) => {
      const exists = prev.find((a) => a.itemId === item._id);
      if (exists) {
        return prev.map((a) =>
          a.itemId === item._id ? { ...a, [field]: value } : a
        );
      }
      return [...prev, { type, itemId: item._id, from: "", to: "", enabled: true }];
    });
  };

  const toggleCheckbox = (item, type, checked) => {
    updateAccess(item, type, "enabled", checked);
  };

  const saveAccess = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/admin/user/${id}/access`,
        { access },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Access updated successfully!");
    } catch (err) {
      console.error("Error saving access:", err);
      alert("Error saving access");
    }
  };

  return (
    <div className="user-access-page">
      {user && (
        <>
          <h2>Access Control for {user.name}</h2>
          <p className="email">{user.email}</p>

          {/* COURSES */}
          <div className="access-block">
            <h3>Course Access</h3>

            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Enabled</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((c) => {
                  const itemAccess = access.find((a) => a.itemId === c._id);

                  return (
                    <tr key={c._id}>
                      <td>{c.title}</td>

                      <td>
                        <DatePicker
                          selected={itemAccess?.from ? new Date(itemAccess.from) : null}
                          onChange={(date) =>
                            updateAccess(c, "course", "from", date.toISOString())
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                          className="date-picker"
                        />
                      </td>

                      <td>
                        <DatePicker
                          selected={itemAccess?.to ? new Date(itemAccess.to) : null}
                          onChange={(date) =>
                            updateAccess(c, "course", "to", date.toISOString())
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                          className="date-picker"
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={itemAccess?.enabled || false}
                          onChange={(e) => toggleCheckbox(c, "course", e.target.checked)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* BUNDLES */}
          <div className="access-block">
            <h3>Bundle Access</h3>

            <table>
              <thead>
                <tr>
                  <th>Bundle</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Enabled</th>
                </tr>
              </thead>

              <tbody>
                {bundles.map((b) => {
                  const itemAccess = access.find((a) => a.itemId === b._id);

                  return (
                    <tr key={b._id}>
                      <td>{b.name}</td>

                      <td>
                        <DatePicker
                          selected={itemAccess?.from ? new Date(itemAccess.from) : null}
                          onChange={(date) =>
                            updateAccess(b, "bundle", "from", date.toISOString())
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                          className="date-picker"
                        />
                      </td>

                      <td>
                        <DatePicker
                          selected={itemAccess?.to ? new Date(itemAccess.to) : null}
                          onChange={(date) =>
                            updateAccess(b, "bundle", "to", date.toISOString())
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                          className="date-picker"
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={itemAccess?.enabled || false}
                          onChange={(e) => toggleCheckbox(b, "bundle", e.target.checked)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          <button className="save-access-btn" onClick={saveAccess}>
            Save Access
          </button>
        </>
      )}
    </div>
  );
};

export default AdminUserAccess;