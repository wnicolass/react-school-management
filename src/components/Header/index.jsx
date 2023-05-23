import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Nav, StyledLink } from './styled';

export default function Header() {
  return (
    <Nav>
      <StyledLink to="/">
        <FaHome size={20} /> Home
      </StyledLink>
      <StyledLink to="/sign-up">
        <FaUserAlt size={20} /> Sign Up
      </StyledLink>
      <StyledLink to="/sign-in">
        <FaSignInAlt size={20} /> Sign In
      </StyledLink>
    </Nav>
  );
}
