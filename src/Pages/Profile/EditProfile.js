import './profile.css';
import ProfileService from "../../Service/ProfileService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmailOtpVerification from './EmailOtpVerification';

export default function Profile() {
    const [oldEmail, setOldEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [newEmail, setNewEmail] = useState('');
    const [otpView, setOtpView] = useState(false);
    const [profile, setProfile] = useState(null); // Added profile state

    const checkEmail = async () => {
        try {
            const email = localStorage.getItem('email');
            if (!email) {
                window.alert('Your old email doesnt exist');
                return;
            }
            setOtpView(true);
            ProfileService.editProfile(oldEmail, newEmail)
            
            
        } catch (err) {
            setError('Failed to fetch profile information.');
        }
    };


    return (
        <div>
            {!otpView && (
                <div className="profile-container">
                    <h1>Edit Profile Page</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <label>Old Email: </label>
                        <input 
                            placeholder='Your Old Email' 
                            value={oldEmail} 
                            onChange={(e) => setOldEmail(e.target.value)} // Added onChange handler
                            type='email'
                            required
                        />
                        <label>New Email: </label>
                        <input 
                            placeholder='Your New Email' 
                            value={newEmail} 
                            onChange={(e) => setNewEmail(e.target.value)} // Added onChange handler
                            type='email'
                            required
                        />
                    </div>
                    <button onClick={checkEmail}>Verify Email</button> {/* Added button to trigger checkEmail */}
                </div>
            )}
            {otpView && (
                <div>
                    <EmailOtpVerification props={newEmail}/>
                </div>
            )}
        </div>
    );
}
