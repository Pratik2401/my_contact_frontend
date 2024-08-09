import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import axios from 'axios';
import swal from 'sweetalert';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ isLoggedIn, setisLoggedIn, username, setusername }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const [page, setPage] = useState('login');

  const handleRegisterClick = () => {
    setPage("register");
  };

  const handleLoginClick = () => {
    setPage("login");
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://contactsphereapp.vercel.app/api/users/login', loginData);
      console.log(response.data);
      setisLoggedIn(true);
      swal("Success", "Your Login Is Successful");
      setusername(response.data.username);
      localStorage.setItem('token', response.data.accessToken);
      navigate('/contacts');
    } catch (error) {
      swal("Error", error.response?.data?.message || "An error occurred");
      console.error('There was an error!', error.response?.data?.message || error);
    }
  };

  const [regData, setRegData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const regUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://contactsphereapp.vercel.app/api/users/register', regData);
      swal("Success", "Your Registration Is Successful");
      console.log(response.data);
    } catch (error) {
      swal("Error", error.response?.data?.message || "An error occurred", "warning");
      console.error('There was an error!', error.response?.data?.message || error);
    }
  };

  return (
    <>
      <Container className={`d-flex justify-content-center ${page === 'register' ? 'white-background' : ''}`}>
        <div className="d-flex justify-content-center login_page">
          <div className="brand_home">{page === 'login' ? 'Login' : 'Register'}</div>
          
          {page === 'login' && (
            <Form onSubmit={loginUser}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name='email' type="email" placeholder="Enter email" className='value_holder' required onChange={handleLoginChange} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name='password' type="password" placeholder="Enter Password" className='value_holder' required onChange={handleLoginChange} />
                </Form.Group>
              </Row>
              <Row className="mb-3 btns">
                <Button className='login_btn' type="submit">
                  Login
                </Button>
                <Button className='login_btn register_btn' onClick={handleRegisterClick}>
                  Register
                </Button>
              </Row>
            </Form>
          )}

          {page === 'register' && (
            <Form onSubmit={regUser}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control name='username' type="text" placeholder="Enter username" className='value_holder' required onChange={handleRegChange} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name='email' type="email" placeholder="Enter email" className='value_holder' required onChange={handleRegChange} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name='password' type="password" placeholder="Enter Password" className='value_holder' required onChange={handleRegChange} />
                </Form.Group>
              </Row>
              <Button className='login_btn register_btn' type="submit">
                Register
              </Button>
              <Button className='login_btn' onClick={handleLoginClick}>
                Go to Login
              </Button>
            </Form>
          )}
        </div>
      </Container>
    </>
  );
}
