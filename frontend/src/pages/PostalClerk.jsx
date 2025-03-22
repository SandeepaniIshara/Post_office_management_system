import React from 'react';
import Navbar from "../components/Navbar/Navbar"; // Correct path
import Sidebar from "../components/Sidebar/Sidebar"; // Correct path
import { Outlet } from 'react-router-dom';
import "./PostalClerk.css";

const PostalClerk = () => {
  return (
    <div className="postal-clerk">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </div>
    </div>
  );
};
export default PostalClerk;