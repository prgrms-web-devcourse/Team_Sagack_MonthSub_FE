import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Flex = ({
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
  <StyledFlex
    width={width}
    height={height}
    horizen={horizen}
    justifyContent={justifyContent}
    alignItems={alignItems}
    {...props}
  >
    {children}
  </StyledFlex>
);

Flex.defaultProps = {
  width: '100%',
  height: '100%',
  color: 'inherit',
  fontSize: 'inherit',
  horizen: false,
  justifyContent: 'flex-start',
  alignItems: 'center',
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  horizen: PropTypes.bool,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
};

export default Flex;

const StyledFlex = styled.ul`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  display: flex;
  flex-direction: ${({ horizen }) => (horizen ? 'row' : 'column')};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;
