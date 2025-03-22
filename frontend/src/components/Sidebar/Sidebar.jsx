import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Sidebar.css'; // Import custom CSS for the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-3">
      <h2 className="text-center mb-4">Postal Clerk</h2>
      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/mailmanagement" className="text-white text-decoration-none d-flex align-items-center">
            <i className="fas fa-envelope me-2"></i>Mail Management
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/billpayment" className="text-white text-decoration-none d-flex align-items-center">
            <i className="fas fa-money-bill me-2"></i>Bill Payment
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/inventory" className="text-white text-decoration-none d-flex align-items-center">
            <i className="fas fa-boxes me-2"></i>Inventory
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/reports" className="text-white text-decoration-none d-flex align-items-center">
            <i className="fas fa-chart-bar me-2"></i>Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;