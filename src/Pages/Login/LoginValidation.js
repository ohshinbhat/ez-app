import { useState } from 'react';
import UserService from '../../Service/UserService';
import { useNavigate } from 'react-router-dom';


export default function LoginValidation(props) {
  const [otp, setOtp] = useState('');

  const email = props.data
  const navigate = useNavigate();

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const status = await UserService.loginValidate(email, otp);
      if (status) {
        alert("Verification Successful!");
        navigate("/profile");
      } else {
        alert("Invalid OTP! Enter the OTP again!");
      }
    } catch (error) {
      console.error("Error during OTP validation:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <h2>Login Validation</h2>
      <p>We have sent an OTP to {email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter OTP:</label>
          <input type="text" value={otp} onChange={handleOtpChange} required />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
      
      
    </div>
  );
}


