import React, { useState } from 'react';
import './Profile.css'; // Import custom CSS for the profile page

const Profile = () => {
    // State to manage profile data
   const [profile, setProfile] = useState({
        name: 'John Doe',
        UserId: 'ABC123',
        phone: '+1234567890',
        address: '123 Main St, City, Country',
    });

    // State to manage edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({
                    ...profile,
                    photo: reader.result, // Store the photo as a base64 string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle save button click
    const handleSave = () => {
        // Add logic to save the updated profile (e.g., API call)
        console.log('Profile saved:', profile);
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-details">
                <div className="profile-photo">
                    {profile.photo ? (
                        <img
                            src={profile.photo}
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <div className="profile-placeholder">No Photo</div>
                    )}
                    {isEditing && (
                        <div className="photo-upload">
                            <label htmlFor="photo-upload" className="upload-label">
                                Upload Photo
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                    )}
                </div>
                <div className="profile-field">
                    <label>Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{profile.name}</span>
                    )}
                </div>

                {/* Email Field */}
                <div className="profile-field">
                    <label>User ID:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="UserId"
                            value={profile.email}
                            //value={profile.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{profile.email}</span>
                    )}
                </div>

                {/* Phone Field */}
                <div className="profile-field">
                    <label>Phone:</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{profile.phone}</span>
                    )}
                </div>

                {/* Address Field */}
                <div className="profile-field">
                    <label>Address:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{profile.address}</span>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <button className="btn-save" onClick={handleSave}>
                            Save
                        </button>
                        <button
                            className="btn-cancel"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        className="btn-edit"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;