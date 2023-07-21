// create a  Nav component

import React from "react";
import { Link } from "next/router";
import { Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import styled from "styled-components";

const StyledSpan = styled.span`
font-family: 'Bebas Neue', sans-serif;
  margin-left: 1rem;
  margin-right: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #032248;
  font-size: 18px;
`;


const LoginButton = styled.button`
font-family: 'Bebas Neue', sans-serif;
  background: #032248;
  color: white;
  border-radius: 10px;
  right: 0;
  float: right;
  width: 90px;
  height: 40px;
  position:absolute;
  margin-left: 1rem;
  margin-right: 3rem;
  text-transform: uppercase;
  font-size:18px;
  font-weight: bold;
  border:none;
  outline:none;
`;

const SignupButton = styled.button`
font-family: 'Bebas Neue', sans-serif;
  background: white;
  color: #032248;
  border-radius: 10px;
  border: none;
  right: calc(150px + 1rem);
  float: right;
  width: 80px;
  height: 30px;
  position:absolute;
  margin-left: 1rem;
  margin-right: 1rem;
  text-transform: uppercase;
  font-size:18px;
  font-weight: bold;
`;

const NavContainer = styled.div`
    position:fixed;
    width:100%;
    z-index: 1;
`;
const Navigation = () => {
  const isAuthenticated = false;

  return (
    <NavContainer>
    <Navbar bg="white" expand="lg">
      <Navbar.Brand as={Link} href="/">
        <Image src="/lg.png" width={250} height={100} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link as={Link} href="/about">
          <StyledSpan>About Us</StyledSpan>
        </Nav.Link>
        <Nav.Link as={Link} to="/schools">
          <StyledSpan>Contact Us</StyledSpan>
        </Nav.Link>
        <SignupButton>Signup</SignupButton>
        <LoginButton>Login</LoginButton>
      </Navbar.Collapse>
    </Navbar>
    </NavContainer>
  );
};

export default Navigation;