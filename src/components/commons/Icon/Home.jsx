import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const Home = ({ fontSize, color, ...props }) => (
  <StyledHomeIcon fontSize={fontSize} color={color} {...props} />
);

Home.defaultProps = {
  fontSize: 'inherit',
  color: theme.color.greyDark,
};

Home.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

export default Home;

const StyledHomeIcon = styled(HomeIcon)`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;
