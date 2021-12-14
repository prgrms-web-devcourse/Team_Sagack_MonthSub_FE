import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const User = ({ fontSize, color, ...props }) => (
  <StyledUserIcon fontSize={fontSize} color={color} {...props} />
);

User.defaultProps = {
  fontSize: 'inherit',
  color: theme.color.greyDark,
};

User.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

export default User;

const StyledUserIcon = styled(PersonIcon)`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;
