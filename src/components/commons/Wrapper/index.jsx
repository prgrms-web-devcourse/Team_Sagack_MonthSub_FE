import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { css } from '@emotion/react';

const Wrapper = ({ children, width, center, section, ...props }) => (
  <StyledDiv width={width} center={center} section={section} {...props}>
    {children}
  </StyledDiv>
);

Wrapper.defaultProps = {
  width: '71.25rem',
  section: false,
  center: false,
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  section: PropTypes.bool,
  center: PropTypes.bool,
};

export default Wrapper;

const StyledDiv = styled.div`
  height: auto;
  max-width: ${props => props.width || '71.25rem'};
  padding: 3rem 0;
  margin: 5rem auto 0;
  ${({ center }) =>
    center &&
    css`
      display: flex;
      height: calc(100vh - ${theme.common.navHeight});
      align-items: center;
    `}
  @media ${theme.device.tablet} {
    max-width: 100%;
    padding: 3rem 2.5rem;
  }
  @media ${theme.device.mobile} {
    max-width: 100%;
    padding: 3rem 1rem;
  }
`;
