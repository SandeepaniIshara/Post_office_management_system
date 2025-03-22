import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='container d-flex flex-grow-1 align-items-center justify-content-center'>
        <div className='home-card'>
          <h1 className='mb-4 text-primary fw-bold'>Welcome to the Post Office Management System</h1>
          <div className='d-flex justify-content-center gap-3 mt-4'>
            <Link to='/login' className='btn btn-lg btn-primary px-4 py-2 shadow-sm'>Login</Link>
            <Link to='/register' className='btn btn-lg btn-success px-4 py-2 shadow-sm'>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
