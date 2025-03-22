import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
    });

    const [error, setError] = useState(''); // State to handle errors

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way
    
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            // Make a POST request to the backend API
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                full_name: formData.username, // Change "username" to "full_name" to match backend
                email: formData.email,
                password: formData.password,
                address: formData.address,
                phone_number: formData.phone, // Change "phone" to "phone_number" to match backend
            });
    
            // Handle successful registration
            if (response.status === 201) {
                alert('User registered successfully!');
                // Redirect to login page or another page
                window.location.href = '/login';
            }
        } catch (err) {
            // Handle errors from the backend
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred during registration');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: '350px' }}>
                <h2 className="text-center mb-4">Create an Account</h2>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-3">
                        <label htmlFor="full_name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                        <label htmlFor="phone_number" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>

                {/* Link to Login Page */}
                <div className="mt-3 text-center">
                    <p className="text-muted">
                        Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;