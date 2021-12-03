import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const List = ({
  children,
  width,
  height,
  color,
  fontSize,
  horizen,
  justifyContent,
  alignItems,
  ...props
}) => (
  <StyledList
    width={width}
    height={height}
    direction={horizen}
    justifyContent={justifyContent}
    alignItems={alignItems}
    {...props}
  >
    {children}
  </StyledList>
);

List.defaultProps = {
  width: '100%',
  height: '100%',
  color: 'inherit',
  fontSize: 'inherit',
  horizen: false,
  justifyContent: 'flex-start',
  alignItems: 'center',
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  horizen: PropTypes.bool,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
};

export default List;

const StyledList = styled.ul`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  display: flex;
  flex-direction: ${({ direction }) => (direction ? 'row' : 'column')};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;
