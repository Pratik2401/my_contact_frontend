import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavbarComponent.css';

export default function NavbarComponent({ isLoggedIn, setisLoggedIn,username,setusername}) {
  
  const logoutFunction=()=>{
    setisLoggedIn(false)
  }
  return (
    <>
      <Navbar expand="lg" className="d-flex justify-content-center custom_navbar">
        <Container className='navbar_custom_css'>
          <Navbar.Brand as={Link} to="/">Contact Sphere</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='align_navbar'>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className='navbar_links'>Home</Nav.Link>
              <Nav.Link as={Link} to="/contacts" className='navbar_links'>Contacts</Nav.Link>
              {isLoggedIn ? (
                <NavDropdown title={username} id="basic-nav-dropdown" className='navbar_links'>
                  <NavDropdown.Item href="#action/3.1" onClick={logoutFunction}>LogOut</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className='start_nav navbar_links'>Register/Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
