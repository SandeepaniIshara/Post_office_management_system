import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session/token
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Brand Logo and Name */}
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-center">
            <img
              src="/background_logo.png"
              alt="Post Office Logo"
              width="40"
              height="40"
              className="navbar-logo"
            />
            <div>
              <div className="navbar-title">Post Office</div>
              <div className="navbar-subtitle">Management System</div>
            </div>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FiMenu size={24} />
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <FiUser className="nav-icon" />
                <span className="nav-text">Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link logout-btn"
                onClick={handleLogout}
              >
                <FiLogOut className="nav-icon" />
                <span className="nav-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;