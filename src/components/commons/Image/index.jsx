import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, width, height, alt, placeholder, ...props }) => (
  <img
    src={src || placeholder}
    alt={alt}
    width={width}
    height={height}
    {...props}
  />
);

Image.defaultProps = {
  src: '',
  width: 0,
  height: 0,
  placeholder: 'https://via.placeholder.com/200',
};

Image.propTypes = {
  src: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Image;
