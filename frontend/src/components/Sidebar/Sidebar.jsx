import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiMail, 
  FiDollarSign, 
  FiPackage, 
  FiBarChart2,
  FiUser
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/mailmanagement', icon: <FiMail />, label: 'Mail Management' },
    { path: '/billpayment', icon: <FiDollarSign />, label: 'Bill Payment' },
    { path: '/inventory', icon: <FiPackage />, label: 'Inventory' },
    { path: '/reports', icon: <FiBarChart2 />, label: 'Reports' },
    { path: '/profile', icon: <FiUser />, label: 'User Profile' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Postal Clerk</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;