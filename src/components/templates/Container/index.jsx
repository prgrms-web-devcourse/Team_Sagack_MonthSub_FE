import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const Container = ({ title, children, ...props }) => (
  <Wrapper {...props}>
    <H1>{title}</H1>
    {children}
  </Wrapper>
);

Container.defaultProps = {
  children: [],
  title: '',
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
};

export default Container;

const H1 = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 0.25rem 0.25rem -0.25rem #c4c4c4;
  padding: 0.5rem 0;
`;

const Wrapper = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  @media ${theme.device.tablet} {
    width: 65%;
  }
  @media ${theme.device.mobile} {
    width: 80%;
  }
`;
