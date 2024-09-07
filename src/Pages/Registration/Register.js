import { Button, Form } from "react-bootstrap";
import './register.css';
import UserService from "../../Service/UserService";
import { useState } from "react";
import OtpVerification from "./OtpVerification";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(true);
    UserService.register(name, email, mobileNumber, password);
  }

  return (
    <>
      { !status &&
      <div className="register-container">
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMobileNumber">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control type="tel" placeholder="Enter mobile number" onChange={(e) => setMobileNumber(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <p className="sign-in">Already have an account? <a href="/login">Sign in</a></p>
      </div> 
      }
      { status &&
      <OtpVerification data={email} />
      }
    </>
  )
}
