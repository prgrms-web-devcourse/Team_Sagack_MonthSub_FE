import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InputText = ({ initialState, name, onChange }) => {
  const [text, setText] = useState(initialState);

  const handleTextChange = e => {
    const { value } = e.target;
    setText({
      value,
    });
    onChange && onChange(value);
  };

  return (
    <div>
      <input
        type="text"
        name={name}
        value={text.value}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default InputText;

InputText.defaultProps = {
  name: '',
  initialState: {},
  onChange: () => {},
};

InputText.propTypes = {
  name: PropTypes.string,
  initialState: PropTypes.object,
  onChange: PropTypes.func,
};
