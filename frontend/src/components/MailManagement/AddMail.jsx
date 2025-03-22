import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AddMail.css'; // Import custom CSS for the AddMail page

const AddMail = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [mail, setMail] = useState({
    type: '',
    sender: '',
    senderAddress: '',
    recipient: '',
    recipientAddress: '',
    status: 'Received',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMail({ ...mail, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Mail:', mail);
    // Add logic to save the mail (e.g., API call)
    navigate('/mailManagement'); // Navigate back to the Mail Management page after saving
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Add New Mail</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Mail Type Field */}
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Mail Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={mail.type}
                onChange={handleChange}
                placeholder="Enter mail type (e.g., Incoming, Outgoing)"
                required
              />
            </div>

            {/* Sender Name Field */}
            <div className="mb-3">
              <label htmlFor="sender" className="form-label">Sender Name</label>
              <input
                type="text"
                className="form-control"
                id="sender"
                name="sender"
                value={mail.sender}
                onChange={handleChange}
                placeholder="Enter sender name"
                required
              />
            </div>

            {/* Sender Address Field */}
            <div className="mb-3">
              <label htmlFor="senderAddress" className="form-label">Sender Address</label>
              <input
                type="text"
                className="form-control"
                id="senderAddress"
                name="senderAddress"
                value={mail.senderAddress}
                onChange={handleChange}
                placeholder="Enter sender address"
                required
              />
            </div>

            {/* Receiver Name Field */}
            <div className="mb-3">
              <label htmlFor="recipient" className="form-label">Receiver Name</label>
              <input
                type="text"
                className="form-control"
                id="recipient"
                name="recipient"
                value={mail.recipient}
                onChange={handleChange}
                placeholder="Enter receiver name"
                required
              />
            </div>

            {/* Receiver Address Field */}
            <div className="mb-3">
              <label htmlFor="recipientAddress" className="form-label">Receiver Address</label>
              <input
                type="text"
                className="form-control"
                id="recipientAddress"
                name="recipientAddress"
                value={mail.recipientAddress}
                onChange={handleChange}
                placeholder="Enter receiver address"
                required
              />
            </div>

            {/* Status Field */}
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-control"
                id="status"
                name="status"
                value={mail.status}
                onChange={handleChange}
              >
                <option value="Received">Received</option>
                <option value="Dispatched">Dispatched</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/MailManagement')} // Navigate back to Mail Management page
              >
                <i className="fas fa-arrow-left me-2"></i>Back
              </button>
              <button type="submit" className="btn btn-primary">
                Save Mail
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMail;