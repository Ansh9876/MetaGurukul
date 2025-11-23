import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
 

const AdminDashboard = () => {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar-wrap">
        <Sidebar role="admin"/> 
      </aside>

      <main className="content-wrap">
        <Outlet /> {/*   admin pages will render here */}
      </main>
    </div>
  );
};

export default AdminDashboard;
