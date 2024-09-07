import { Button, Form } from "react-bootstrap";
import './login.css';
import UserService from "../../Service/UserService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginValidation from "./LoginValidation";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const [status,setStatus] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await UserService.login(email, password)
      console.log(userData)
      if (userData.email) {
          setStatus(true)
          localStorage.setItem('email', userData.email)
          localStorage.setItem('name', userData.name)
          localStorage.setItem('mobileNumber',userData.mobileNumber)
          //navigate('/profile')
      }else{
          console.error(userData)
          setError(userData)
      }
      
  } catch (error) {
      console.log(error)
  }
  }

  return (
    <>
    { !status && (
    <div className="login-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="sign-up">Don't have an account? <a href="/register">Sign up</a></p>
      <p>{error}</p>
      {
        error =="Wrong Password!" &&
        <>
        <p>Enter correct password</p>
        </>
      }
      {
        error == "User Not Found" &&
        <>
        <p>Try Signing up</p></>
      }
      {
        error == "User Not Verified" &&
        <>
        <p>Try Sign up</p></>
      }
      </div>
  )
}
      {
        status && <LoginValidation data={email}/>
      }
    
    
    </>
  );
}
