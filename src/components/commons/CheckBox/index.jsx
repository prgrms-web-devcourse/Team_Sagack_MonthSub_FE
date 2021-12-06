import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@components';

const CheckBox = ({ labels, onChange, checkedInputs }) => {
  const handleChange = e => {
    onChange && onChange(e.target.checked, e.target.id);
  };
  return (
    <>
      {labels.map(label => (
        <span key={label}>
          <Input
            type="checkbox"
            name="date"
            id={label}
            onChange={handleChange}
            value=""
            checked={checkedInputs.includes(label)}
          />
          {label}
        </span>
      ))}
    </>
  );
};

CheckBox.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkedInputs: PropTypes.array,
};

CheckBox.defaultProps = {
  onChange: () => {},
  checkedInputs: [],
};

export default CheckBox;
