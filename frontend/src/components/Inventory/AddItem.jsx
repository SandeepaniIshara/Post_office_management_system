import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddItem = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    id: '',
    name: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Item:', item);
    // Add logic to save the item (e.g., API call)
    navigate('/inventory'); // Navigate back to the inventory page after saving
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Add New Item</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* ID Field */}
            <div className="mb-3">
              <label htmlFor="id" className="form-label">Item ID</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={item.id}
                onChange={handleChange}
                placeholder="Enter item ID"
                required
              />
            </div>

            {/* Item Name Field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={item.name}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Quantity Field */}
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={item.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
              />
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/inventory')} // Navigate back to inventory page
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Save Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;