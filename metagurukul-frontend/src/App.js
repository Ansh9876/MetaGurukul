import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses'; 
import Membership from './pages/Membership';
import Login from './pages/Login';
import Signup from './pages/Signup'; 
import CourseDetail from './pages/CourseDetails';
import WatchCourse from './pages/WatchCourse';

import UserDashboard from './pages/user/UserDashboard';
import Userprofile from './pages/user/Userprofile';
import ActiveCourses from './pages/user/ActiveCourses';
import Community from './pages/user/Community';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminHome from './pages/admin/AdminHome';
import AdminCourses from './pages/admin/AdminCourses';
import CreateCourse from './pages/admin/CreateCourse';
import EditCourse from './pages/admin/EditCourses';
 import AdminLearners from './pages/admin/AdminLearners';
import AdminAdmins from './pages/admin/AdminAdmins';
import AdminBundles from './pages/admin/AdminBundles';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail/>} />
        <Route path="/watch/:id" element={<WatchCourse />} />
         
        <Route path="/membership" element={<Membership />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         

        {/* User Dashboard with nesteda routes */}
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="active-courses" replace />} />
          <Route path="user-profile" element={<Userprofile />} />
          <Route path="active-courses" element={<ActiveCourses />} />
          <Route path="community" element={<Community />} />
        </Route>

        {/* Admin Dashboard with nested routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="admin-home" replace />} />
          <Route path="admin-profile" element={<AdminProfile />} />
          <Route path="admin-home" element={<AdminHome />} />
          <Route path="admin-courses" element={<AdminCourses />} />
          <Route path="create-course" element={<CreateCourse/>} />
          <Route path="edit-course/:id" element={<EditCourse />} /> 
           <Route path="admin-learners" element={<AdminLearners />} />
          <Route path="admin-admins" element={<AdminAdmins />} />
          <Route path="admin-bundles" element={<AdminBundles/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
