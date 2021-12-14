import React from 'react';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Like = ({ fontSize, color, ...props }) => (
  <StyledLikeIcon fontSize={fontSize} color={color} {...props} />
);

Like.defaultProps = {
  fontSize: 'inherit',
  color: 'inherit',
};

Like.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

export default Like;

const StyledLikeIcon = styled(LikeIcon)`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;
