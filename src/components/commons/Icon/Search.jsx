import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Search = ({ fontSize, color, ...props }) => (
  <StyledSearchIcon fontSize={fontSize} color={color} {...props} />
);

Search.defaultProps = {
  fontSize: 'inherit',
  color: '#4b4b4b',
};

Search.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

const StyledSearchIcon = styled(SearchIcon)`
  color: ${({ color }) => color};
  fontsize: ${({ fontSize }) => fontSize};
`;

export default Search;
