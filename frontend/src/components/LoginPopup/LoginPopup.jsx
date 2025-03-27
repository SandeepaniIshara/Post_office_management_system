import React, { useState } from 'react';
import './LoginPopup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

const LoginPopup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;
      
      // Store token in localStorage and context/state
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect based on user type
      if (user.userType === 'Postal Clerk') {
        navigate('/postalClerk');
      } else if (user.userType === 'Admin') {
        navigate('/admin');
      } else {
        setError('Unauthorized access. Please contact admin.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.message || 
                         'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <h2>Post Office Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Official Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <>
              <FiLogIn className="btn-icon" />
              Login
            </>
          )}
        </button>
        
        <div className="login-footer">
          <a href="/forgot-password" className="forgot-password">
            Forgot your password?
          </a>
          <p className="signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;