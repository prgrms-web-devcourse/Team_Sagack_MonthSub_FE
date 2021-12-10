import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';
import { Link } from 'react-router-dom';

const UserModal = ({
  maxWidth,
  items,
  visible,
  onClick,
  isSignIn,
  ...props
}) => (
  <StyledDiv maxwidth={maxWidth} visible={visible} {...props}>
    <List>
      <li>
        <Link to="/my-info">마이페이지</Link>
      </li>
      <li>
        <Link to="/">관심 시리즈</Link>
      </li>
      {isSignIn ? (
        <li onClick={onClick}>로그아웃</li>
      ) : (
        <Link to="/signin">로그인</Link>
      )}
    </List>
  </StyledDiv>
);

UserModal.defaultProps = {
  maxWidth: '200px',
  visible: false,
  onClick: () => {},
};

export default UserModal;

UserModal.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.array.isRequired,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  isSignIn: PropTypes.string.isRequired,
};

const StyledDiv = styled.nav`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  width: 100%;
  max-width: ${({ maxwidth }) => maxwidth};
  background-color: aliceblue;
`;
