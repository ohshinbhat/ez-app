import './profile.css';
import ProfileService from "../../Service/ProfileService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileValidate from "./EditProfileValidate";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    navigate('/login'); // Redirect to login if email is not found
                    return;
                }
                
                const profileData = await ProfileService.viewProfile(email);
                setProfile(profileData);
                setError('');
            } catch (err) {
                setError('Failed to fetch profile information.');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleEditProfile = () => {
        navigate('/edit-profile'); //handle path 
    };

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            {error && <p className="error-message">{error}</p>}
            {profile ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
        </div>
    );
}
