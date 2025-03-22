import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar'; // Import the Navbar component
import Sidebar from './Sidebar/Sidebar'; // Import the Sidebar component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Layout.css'; // Import custom CSS for the layout

const Layout = () => {
    const location = useLocation();

    // Define paths where the sidebar should NOT be shown
    const hideSidebarPaths = ['/', '/login', '/register', '/profile'];

    // Check if the current route should hide the sidebar
    const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);

    return (
        <div>
            {/* Render the Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <div className="layout-container d-flex">
                {/* Conditionally render the Sidebar */}
                {shouldShowSidebar && <Sidebar />}

                {/* Render the child routes (components passed to the Layout) */}
                <div className="main-content flex-grow-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;