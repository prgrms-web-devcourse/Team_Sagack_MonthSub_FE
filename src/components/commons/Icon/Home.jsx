import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Home = ({ fontSize, color, ...props }) => (
  <StyledHomeIcon fontSize={fontSize} color={color} {...props} />
);

Home.defaultProps = {
  fontSize: 'inherit',
  color: '#4b4b4b',
};

Home.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

const StyledHomeIcon = styled(HomeIcon)`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;

export default Home;
