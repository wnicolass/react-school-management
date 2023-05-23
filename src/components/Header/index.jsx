import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav } from './styled';

export default function Header() {
  const btnClicked = useSelector((state) => state.example.buttonClicked);
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} /> Home
      </Link>
      <Link to="/profile">
        <FaUserAlt size={24} /> Profile
      </Link>
      <Link to="/sign-in">
        <FaSignInAlt size={24} /> Sign In
      </Link>
      {btnClicked ? 'clicked' : 'no clicked'}
    </Nav>
  );
}
