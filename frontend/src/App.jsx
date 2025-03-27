import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PostalClerk from './pages/PostalClerk';
import MailManagement from './components/MailManagement/MailManagement';
import BillPayment from './components/BillPayment/BillPayment';
import Inventory from './components/Inventory/Inventory';
import Reports from './components/Reports/Reports';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Register from './components/Register/Register';
import Layout from './components/Layout';
import Profile from './components/Profile/Profile';
import AddBill from './components/BillPayment/AddBill';
import AddMail from './components/MailManagement/AddMail';
import AddItem from './components/Inventory/AddItem';
import './App.css';

const App = () => {
  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/billPayment/add" element={<AddBill />} />
        <Route path="/mailManagement/add" element={<AddMail />} />
        <Route path="/inventory/add" element={<AddItem />} />
        <Route element={<Layout />}> {/* Wrap routes that need the navbar */}
          <Route path="/postalClerk" element={<PostalClerk />} />
          <Route path="/mailManagement" element={<MailManagement />} />
          <Route path="/billPayment" element={<BillPayment />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
/*import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import PostalClerk from './pages/PostalClerk';
import MailManagement from './components/MailManagement/MailManagement';
import BillPayment from './components/BillPayment/BillPayment';
import Inventory from './components/Inventory/Inventory';
import Reports from './components/Reports/Reports';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Register from './components/Register/Register';
import Layout from './components/Layout';
import './App.css';

const App = () => {
  const location = useLocation();
  const showNavbar = !['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postalClerk" element={<PostalClerk />} />
        <Route path="/mailManagement" element={<MailManagement />} />
        <Route path="/billPayment" element={<BillPayment />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App; */