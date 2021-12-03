import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = ({ src, alt, ...props }) => (
  <h1 {...props}>
    <Link to="/">
      <img src={src} alt={alt} />
    </Link>
  </h1>
);

export default Logo;

Logo.defaultProps = {
  src: '',
  alt: 'Logo',
};

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
