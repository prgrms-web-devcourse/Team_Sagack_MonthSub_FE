import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@styles/theme';

const Wrapper = ({ children, width, section, ...props }) => (
  <StyledDiv width={width} section={section} {...props}>
    {children}
  </StyledDiv>
);

Wrapper.defaultProps = {
  width: '71.25rem',
  section: false,
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  section: PropTypes.bool,
};

export default Wrapper;

const StyledDiv = styled.div`
  height: auto;
  max-width: ${props => props.width || '71.25rem'};
  margin: 0 auto;
  padding: 3rem 0;
  ${({ section }) =>
    !section &&
    css`
      margin: 5rem auto 0;
      @media ${theme.device.tablet} {
        max-width: 100%;
        padding: 3rem 2.5rem;
      }

      @media ${theme.device.mobile} {
        max-width: 100%;
        padding: 3rem 1rem;
      }
    `}
`;
