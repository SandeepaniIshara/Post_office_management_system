import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddMail.css';

const AddMail = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState({
    mailId: '', // Added mailId field
    type: '',
    sender: '',
    senderAddress: '',
    recipient: '',
    recipientAddress: '',
    status: 'Received',
  });

  // Generate a unique mail ID on component mount
  useEffect(() => {
    const generateMailId = () => {
      const prefix = 'PO-'; // Post Office prefix
      const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD format
      return `${prefix}${date}-${randomNum}`;
    };
    
    setMail(prev => ({ ...prev, mailId: generateMailId() }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMail({ ...mail, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Mail:', mail);
    // Add logic to save the mail (e.g., API call)
    navigate('/mailManagement');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Add New Mail</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Mail ID Field (read-only) */}
            <div className="mb-3">
              <label htmlFor="mailId" className="form-label">Mail ID</label>
              <input
                type="text"
                className="form-control"
                id="mailId"
                name="mailId"
                value={mail.mailId}
                onChange={handleChange}
                readOnly
                style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
              />
              <small className="text-muted">Automatically generated mail ID</small>
            </div>

            {/* Mail Type Field */}
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Mail Type</label>
              <select
                className="form-control"
                id="type"
                name="type"
                value={mail.type}
                onChange={handleChange}
                required
              >
                <option value="">Select mail type</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
                <option value="Registered">Registered</option>
                <option value="Express">Express</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/MailManagement')}
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