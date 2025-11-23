import React from "react";
import { Outlet } from "react-router-dom"; 
import Sidebar from "../../components/Sidebar";
import '../../styles/components/dashboard.css'
const UserDashboard = () => {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar-wrap">
        <Sidebar role="user"/> 
      </aside>

      <main className="content-wrap">
        <Outlet /> {/*   user pages will render here */}
      </main>
    </div>
  );
};

export default UserDashboard;
