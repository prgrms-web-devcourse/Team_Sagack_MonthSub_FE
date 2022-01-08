import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const NoData = ({ children, height, backgroundColor }) => (
  <Container height={height} backgroundColor={backgroundColor}>
    <p>{children}</p>
  </Container>
);

NoData.defaultProps = {
  children: '데이터가 없습니다.',
  height: '10rem',
  backgroundColor: theme.color.grey,
};

NoData.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
};

export default NoData;

const Container = styled.div`
  width: 100%;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.greyDark};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
