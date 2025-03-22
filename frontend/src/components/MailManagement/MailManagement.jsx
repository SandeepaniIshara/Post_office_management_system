import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './MailManagement.css';

const MailManagement = () => {
  const [mails, setMails] = useState([
    { id: 1, type: 'Incoming', sender: 'John Doe', senderAddress: '123 Main St, City', recipient: 'Jane Doe', recipientAddress: '456 Elm St, Town', status: 'Received' },
    { id: 2, type: 'Outgoing', sender: 'Jane Doe', senderAddress: '456 Elm St, Town', recipient: 'John Doe', recipientAddress: '123 Main St, City', status: 'Dispatched' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMail, setNewMail] = useState({
    id: '',
    type: '',
    sender: '',
    senderAddress: '',
    recipient: '',
    recipientAddress: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMail({ ...newMail, [name]: value });
  };

  const handleAddMail = () => {
    setMails([...mails, { ...newMail, id: mails.length + 1 }]);
    setShowModal(false);
    setNewMail({
      id: '',
      type: '',
      sender: '',
      senderAddress: '',
      recipient: '',
      recipientAddress: '',
      status: '',
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setMails(
      mails.map((mail) =>
        mail.id === id ? { ...mail, status: newStatus } : mail
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Mail Management</h2>

      {/* Add Button */}
      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          Add Mail
        </button>
      </div>

      {/* Mail Table */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Mail ID</th>
            <th>Sender Name</th>
            <th>Sender Address</th>
            <th>Receiver Name</th>
            <th>Receiver Address</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((mail) => (
            <tr key={mail.id}>
              <td>{mail.id}</td>
              <td>{mail.sender}</td>
              <td>{mail.senderAddress}</td>
              <td>{mail.recipient}</td>
              <td>{mail.recipientAddress}</td>
              <td>{mail.type}</td>
              <td>
                <select
                  className="form-select"
                  value={mail.status}
                  onChange={(e) => handleStatusChange(mail.id, e.target.value)}
                >
                  <option value="Received">Received</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Mail */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Mail</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Mail Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={newMail.type}
                    onChange={handleChange}
                    placeholder="Enter mail type (e.g., Incoming, Outgoing)"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="sender" className="form-label">Sender Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sender"
                    name="sender"
                    value={newMail.sender}
                    onChange={handleChange}
                    placeholder="Enter sender name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="senderAddress" className="form-label">Sender Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="senderAddress"
                    name="senderAddress"
                    value={newMail.senderAddress}
                    onChange={handleChange}
                    placeholder="Enter sender address"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient" className="form-label">Receiver Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient"
                    name="recipient"
                    value={newMail.recipient}
                    onChange={handleChange}
                    placeholder="Enter receiver name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipientAddress" className="form-label">Receiver Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipientAddress"
                    name="recipientAddress"
                    value={newMail.recipientAddress}
                    onChange={handleChange}
                    placeholder="Enter receiver address"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={newMail.status}
                    onChange={handleChange}
                  >
                    <option value="Received">Received</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddMail}
                >
                  Save Mail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailManagement;