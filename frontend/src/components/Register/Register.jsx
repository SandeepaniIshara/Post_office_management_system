import React, { useState } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiHome, FiPhone, FiLogIn } from 'react-icons/fi';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone_number: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                phone_number: formData.phone_number,
            });

            if (response.status === 201) {
                alert('Registration successful! Please login with your credentials.');
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-popup">
                <h2 className="register-title">Post Office Registration</h2>
                {error && <div className="register-error">{error}</div>}

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FiUser className="input-icon" />
                        <input
                            type="text"
                            id="full_name"
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FiMail className="input-icon" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Official Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FiHome className="input-icon" />
                        <input
                            type="text"
                            id="address"
                            placeholder="Full Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FiPhone className="input-icon" />
                        <input
                            type="tel"
                            id="phone_number"
                            placeholder="Phone Number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : (
                            <>
                                <FiLogIn style={{ marginRight: '8px' }} />
                                Register
                            </>
                        )}
                    </button>
                </form>

                <div className="login-link">
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;