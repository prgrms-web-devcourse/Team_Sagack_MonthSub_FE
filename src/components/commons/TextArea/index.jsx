import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TextArea = ({ width, height, disabled, onChange }) => {
  const [data, setData] = useState();

  const handleChange = e => {
    const { value } = e.target;
    setData(value);
    onChange && onChange(value);
  };

  return (
    <StyledTextArea
      width={width}
      height={height}
      disabled={disabled}
      value={data || ''}
      onChange={handleChange}
    />
  );
};

export default TextArea;

TextArea.defaultProps = {
  width: 0,
  height: 0,
  disabled: false,
  onChange: () => {},
};

TextArea.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

const StyledTextArea = styled.textarea`
  resize: none;
`;
