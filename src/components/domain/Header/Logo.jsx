import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ src, alt, onClick, ...props }) => {
  const handleLogoClick = () => {
    onClick && onClick();
  };

  return (
    <h1 {...props}>
      <a href="/" onClick={handleLogoClick}>
        <img src={src} alt={alt} />
      </a>
    </h1>
  );
};

Logo.defaultProps = {
  src: '',
  alt: 'Logo',
  onClick: () => {},
};

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

export default Logo;
