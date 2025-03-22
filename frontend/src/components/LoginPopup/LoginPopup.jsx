import React from 'react';
import './LoginPopup.css';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'User';

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform login logic here (e.g., API call to authenticate the user)
    // If login is successful, navigate to the appropriate dashboard
    if (userType === 'Postal Clerk') {
      navigate('/PostalClerk');
    } else if (userType === 'Mail Deliverer') {
      navigate('/MailDeliverer');
    }
  };

  return (
    <div className='login-popup'>
      <h2>Login as {userType}</h2>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='Username' required />
        <input type='password' placeholder='Password' required />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPopup;