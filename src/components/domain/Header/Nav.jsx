import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';

const Nav = ({ maxWidth, items, ...props }) => (
  <StyledNav maxwidth={maxWidth} {...props}>
    <List horizen justifyContent="space-between">
      <li>Home</li>
      <li>구독 모집</li>
      <li>내 채널</li>
    </List>
  </StyledNav>
);

export default Nav;

Nav.defaultProps = {
  maxWidth: '350px',
};

Nav.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.array.isRequired,
};

const StyledNav = styled.nav`
  width: 100%;
  max-width: ${({ maxwidth }) => maxwidth};
`;
