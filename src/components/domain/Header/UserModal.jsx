import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';
import { Link } from 'react-router-dom';

const UserModal = ({ maxWidth, items, visible, onClick, ...props }) => (
  <StyledDiv maxwidth={maxWidth} visible={visible} {...props}>
    <List>
      <li>
        <Link to="/info/my">마이페이지</Link>
      </li>
      <li>
        <Link to="/">관심 시리즈</Link>
      </li>
      <li onClick={onClick}>로그아웃</li>
    </List>
  </StyledDiv>
);

export default UserModal;

UserModal.defaultProps = {
  maxWidth: '200px',
  visible: false,
  onClick: () => {},
};

UserModal.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.array.isRequired,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
};

const StyledDiv = styled.nav`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  width: 100%;
  max-width: ${({ maxwidth }) => maxwidth};
  background-color: aliceblue;
`;
