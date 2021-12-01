import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';

const Nav = ({ maxWidth, items, ...props }) => (
  <StyledNav maxwidth={maxWidth} {...props}>
    <List items={items} horizen justifyContent="space-between" />
  </StyledNav>
);

Nav.defaultProps = {
  maxWidth: '350px',
};

Nav.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.array.isRequired,
};

export default Nav;

const StyledNav = styled.nav`
  width: 100%;
  max-width: ${({ maxwidth }) => maxwidth};
`;
