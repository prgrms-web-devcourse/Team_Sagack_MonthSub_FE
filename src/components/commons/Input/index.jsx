import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name,
  width,
  height,
  disabled,
  value,
  type,
  placeholder,
  onChange,
}) => (
  <input
    name={name}
    width={width}
    height={height}
    disabled={disabled}
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
  />
);
export default Input;

Input.defaultProps = {
  name: '',
  width: 0,
  height: 0,
  disabled: false,
  type: 'text',
  placeholder: '',
  onChange: () => {},
};

Input.propTypes = {
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
