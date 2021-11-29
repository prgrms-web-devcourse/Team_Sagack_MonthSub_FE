import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  block,
  src,
  width,
  height,
  alt,
  mode,
  placeholder,
  ...props
}) => {
  const imageStyle = {
    display: block ? 'block' : undefined,
    width,
    height,
    objectFit: mode,
  };
  return (
    <img
      src={src || placeholder}
      alt={alt}
      style={{ ...props, ...imageStyle }}
    />
  );
};

Image.defaultProps = {
  block: 'block',
  width: 0,
  height: 0,
  mode: 'cover',
  placeholder: 'https://via.placeholder.com/200',
};

Image.propTypes = {
  block: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string.isRequired,
  mode: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Image;
