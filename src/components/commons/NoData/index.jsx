import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const NoData = ({ width, height, ...props }) => (
  <NoDataWrapper width={width} height={height} {...props}>
    데이터가 존재하지 않습니다.
  </NoDataWrapper>
);

NoData.defaultProps = {
  width: '100%',
  height: '31.25rem',
};

NoData.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default NoData;

const NoDataWrapper = styled.div`
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  display: flex;
  justify-content: center;
  align-items: center;
`;
