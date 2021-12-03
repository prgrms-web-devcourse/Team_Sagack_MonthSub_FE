import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TextArea = ({
  width,
  height,
  disabled,
  name,
  value,
  onChange,
  ...props
}) => {
  const handleChange = () => {
    onChange && onChange();
  };

  return (
    <StyledTextArea
      width={width}
      height={height}
      disabled={disabled}
      value={value}
      name={name}
      onChange={handleChange}
      {...props}
    />
  );
};

export default TextArea;

TextArea.defaultProps = {
  width: 'auto',
  height: 'auto',
  disabled: false,
  onChange: () => {},
};

TextArea.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const StyledTextArea = styled.textarea`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  padding: 0.4rem;
  resize: none;
`;
