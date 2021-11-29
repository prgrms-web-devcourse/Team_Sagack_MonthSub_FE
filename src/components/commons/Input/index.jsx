import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, width, height, disabled, type, onChange }) => {
  const [data, setData] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setData(value);
    onChange && onChange(value);
  };

  return (
    <input
      name={name}
      width={width}
      height={height}
      disabled={disabled}
      value={data || ''}
      type={type}
      onChange={handleChange}
    />
  );
};

export default Input;

Input.defaultProps = {
  name: '',
  width: 0,
  height: 0,
  disabled: false,
  type: 'text',
  onChange: () => {},
};

Input.propTypes = {
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
};
