import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="hero-section">
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-lg-8 col-md-10 mx-auto text-center">
            <div className="hero-content">
              <h1 className="hero-title mb-4">
                <span className="post-office-text">Post Office</span> <span className="management-system-text">Management System</span>
              </h1>
              <p className="hero-subtitle mb-5">
                Streamlining postal services with modern technology and efficiency
              </p>
              <div className="d-flex justify-content-center gap-4 mt-4 button-group">
                <Link to='/login' className='btn btn-primary-blue btn-lg px-4 py-3 rounded-pill shadow'>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Login
                </Link>
                <Link to='/register' className='btn btn-outline-blue btn-lg px-4 py-3 rounded-pill shadow'>
                  <i className="bi bi-person-plus me-2"></i>Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="hero-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-down">
        <span className="scroll-arrow"></span>
      </div>
    </header>
  );
};

export default Header;