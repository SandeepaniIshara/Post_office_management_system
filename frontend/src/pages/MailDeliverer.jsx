import React from 'react';
import Navbar from "./components/Navbar/Navbar"; // Correct path
import Sidebar from "../components/Sidebar/Sidebar"; // Correct path
import { Outlet,useLocation } from 'react-router-dom';
import "./MailDeliverer.css";

const MailDeliverer = () => {
  return (
    <div className="mail-deliverer">
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

export default MailDeliverer;