import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';

const Home = ({ width, height, color }) => (
  <StyledHomeIcon width={width} height={height} color={color} />
);

export default Home;

Home.defaultProps = {
  width: 0,
  height: 0,
  color: '#000000',
};

Home.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

const StyledHomeIcon = styled(HomeIcon)`
  width: ${props => props.width || '1.5rem'};
  height: ${props => props.height || '1.5rem'};
  color: ${props => props.color || '#000000'};
`;
