import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaSignInAlt, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { Nav, StyledLink } from './styled';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  function handleSignOut(event) {
    event.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  }

  return (
    <Nav>
      <StyledLink to="/">
        <FaHome size={20} /> Home
      </StyledLink>
      {isLoggedIn ? (
        <StyledLink onClick={(event) => handleSignOut(event)} to="/sign-out">
          <FaSignOutAlt size={20} /> Sign Out
        </StyledLink>
      ) : (
        <StyledLink to="/sign-in">
          <FaSignInAlt size={20} /> Sign In
        </StyledLink>
      )}
      <StyledLink to="/sign-up">
        <FaUserAlt size={20} /> {isLoggedIn ? 'Update Account' : 'Sign Up'}
      </StyledLink>
    </Nav>
  );
}
