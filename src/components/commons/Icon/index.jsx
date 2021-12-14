import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';
import Like from './Like';
import Home from './Home';
import User from './User';

const Icons = ({
  fontSize,
  backgroundColor,
  isDisabled,
  onClick,
  ...props
}) => (
  <IconWrapper
    fontSize={fontSize}
    backgroundColor={backgroundColor}
    isDisabled={isDisabled}
    onClick={onClick}
    {...props}
  />
);

Icons.propTypes = {
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Icons.defaultProps = {
  fontSize: theme.font.large,
  backgroundColor: 'transparent',
  isDisabled: false,
  onClick: () => {},
};

Icons.Like = Like;
Icons.Home = Home;
Icons.User = User;

export default Icons;

const IconWrapper = styled.div`
  font-size: ${({ fontSize }) => fontSize};
  display: inline-block;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
