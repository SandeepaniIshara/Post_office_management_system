import React from 'react';
import './Reports.css';

const Reports = () => {
  return (
    <div className="reports">
      <h2>Reports</h2>
      <div className="report-options">
        <button>Daily Report</button>
        <button>Weekly Report</button>
        <button>Monthly Report</button>
      </div>
    </div>
  );
};

export default Reports;