import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const BillPayment = () => {
  const [bills, setBills] = useState([
    { id: 1, type: 'Electricity', amount: 5000, status: 'Paid' },
    { id: 2, type: 'Water', amount: 2000, status: 'Pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter bills based on search term
  const filteredBills = bills.filter((bill) =>
    bill.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Bill Payments</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search bills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bill Payment Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.type}</td>
              <td>${bill.amount}</td>
              <td>
                <span className={`badge ${bill.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                  {bill.status}
                </span>
              </td>
              <td>
                <button className="btn btn-primary btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Bill Button */}
      <div className="text-end">
        <button className="btn btn-success"
        onClick={() => navigate('/billPayment/add')}>Add New Bill</button>
      </div>
    </div>
  );
};

export default BillPayment;