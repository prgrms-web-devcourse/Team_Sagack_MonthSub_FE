import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_PROFILE_IMAGE =
  'https://monthsub-image.s3.ap-northeast-2.amazonaws.com/users/default/defaultProfile.jpg';

const Image = ({ src, width, height, alt, placeholder, ...props }) => (
  <img
    src={src || DEFAULT_PROFILE_IMAGE}
    alt={alt}
    width={width}
    height={height}
    placeholder={placeholder}
    {...props}
  />
);

Image.defaultProps = {
  src: DEFAULT_PROFILE_IMAGE,
  width: 0,
  height: 0,
  placeholder: DEFAULT_PROFILE_IMAGE,
};

Image.propTypes = {
  src: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Image;
