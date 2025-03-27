import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Inventory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'Stamps', quantity: 100 },
    { id: 2, name: 'Envelopes', quantity: 50 },
    { id: 3, name: 'Packaging Boxes', quantity: 20 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Inventory Management</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Inventory Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Item Button */}
      <div className="text-end">
        <button
          className="btn btn-success"
          onClick={() => navigate('/inventory/add')}
        >
          Add New Item
        </button>
      </div>
    </div>
  );
};

export default Inventory;