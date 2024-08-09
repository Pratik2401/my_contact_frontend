import React from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import heroImage from "../images/hero_image.jpg";
import { useState } from 'react';
import MongoDB from "../images/mongoDB.png";
import ExpressJs from "../images/express-js.png";
import ReactJs from "../images/React.png";
import NodeJs from "../images/nodejs.png";
import Image from "react-bootstrap/Image";
import { Link } from 'react-router-dom';
export default function Home({ isLoggedIn, setisLoggedIn }) {

  return (
    <>
      <Container>
        {/* Hero Section */}
        <Row>
          <Col md={6}>
            <div className="grid-item d-flex justify-content-center block_info">
              <p className="brand_home">Connect Sphere</p>
              <p className="brand_slogan">
                Your Contacts, Organized with Elegance
              </p>
              <p className="info">
                ContactSphere is a sophisticated contact management application
                built using the MERN stack, designed to streamline and enhance
                user interactions with their contact lists. It allows multiple
                users to securely store, organize, and access their contacts
                through a sleek and intuitive interface. The application
                features advanced functionalities such as easy contact addition,
                seamless synchronization across devices, and powerful search
                capabilities. With a focus on user experience and security,
                ContactSphere aims to provide an elegant solution for efficient
                contact management and connectivity.
              </p>
              <Button className="start_btn" as={Link} to="/login">Get Started</Button>
            </div>
          </Col>
          <Col md={6} className="image_layout">
            <div className="grid-item d-flex justify-content-center">
              <div className="inner_shadow">
                <div className="drop_shadow">
                  <Image
                    src={heroImage}
                    alt="Pratik"
                    className="img-fluid rounded-circle hero_image "
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Tech Stack */}
        <Row className="tech_stack_section">
          <Col xs={12}>
            <p className="tech_heading">Tech Stack Used:</p>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="techs">
            <div className="grid-item d-flex justify-content-center tech_align">
              <div className="inner_shadow_tech">
                <div className="drop_shadow_tech">
                  <Image
                    src={MongoDB}
                    alt="MongoDB"
                    className="img-fluid rounded-circle tech_stack"
                  />
                </div>
              </div>
              <p className="tech_name">MongoDB</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="techs">
            <div className="grid-item d-flex justify-content-center tech_align">
              <div className="inner_shadow_tech">
                <div className="drop_shadow_tech">
                  <Image
                    src={ExpressJs}
                    alt="ExpressJS"
                    className="img-fluid rounded-circle tech_stack"
                  />
                </div>
              </div>
              <p className="tech_name">ExpressJS</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="techs">
            <div className="grid-item d-flex justify-content-center tech_align">
              <div className="inner_shadow_tech">
                <div className="drop_shadow_tech">
                  <Image
                    src={ReactJs}
                    alt="ReactJS"
                    className="img-fluid rounded-circle tech_stack"
                  />
                </div>
              </div>
              <p className="tech_name">ReactJS</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="techs">
            <div className="grid-item d-flex justify-content-center tech_align">
              <div className="inner_shadow_tech">
                <div className="drop_shadow_tech">
                  <Image
                    src={NodeJs}
                    alt="NodeJS"
                    className="img-fluid rounded-circle tech_stack"
                  />
                </div>
              </div>
              <p className="tech_name">NodeJS</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
