import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Flex } from '@components';
import { Link } from 'react-router-dom';

const Nav = ({ maxWidth, items, ...props }) => (
  <StyledNav maxWidth={maxWidth} {...props}>
    <Flex horizen justifyContent="space-between">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/series">구독 모집</Link>
      </li>
      <li>
        <Link to="/channel/my">내 채널</Link>
      </li>
    </Flex>
  </StyledNav>
);

export default Nav;

Nav.defaultProps = {
  maxWidth: '21.825rem',
};

Nav.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.array.isRequired,
};

const StyledNav = styled.nav`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
`;
