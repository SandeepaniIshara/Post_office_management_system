import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Navbar.css'; // Import custom CSS for the navbar

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add logout logic here (e.g., clear user session, redirect to login, etc.)
        console.log('User logged out');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Brand Logo and Name */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/background_logo.png" // Add your logo here
                        alt="Logo"
                        width="40"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                    <span>Post Office Management System</span>
                </Link>

                {/* Hamburger Menu for Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Profile Link */}
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/profile">
                                <i className="fas fa-user-circle me-2"></i>Profile
                            </Link>
                        </li>

                        {/* Logout Button */}
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link d-flex align-items-center"
                                onClick={handleLogout}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <i className="fas fa-sign-out-alt me-2"></i>Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
