import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const User = ({ fontSize, color, ...props }) => (
  <StyledUserIcon fontSize={fontSize} color={color} {...props} />
);

User.defaultProps = {
  fontSize: 'inherit',
  color: '#4b4b4b',
}

User.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
}

const StyledUserIcon = styled(PersonIcon)`
  color: ${({ color }) => color};
  fontSize: ${({ fontSize }) => fontSize};
`;

export default User;