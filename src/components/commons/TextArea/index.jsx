import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '@styles/theme';

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

export default TextArea;

const StyledTextArea = styled.textarea`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  padding: 0.4rem;
  border: 0.063rem solid ${theme.color.greyMedium};
  border-radius: 0.2rem;
  resize: none;
  &:focus {
    background-color: #ffffff;
    border: 0.063rem solid ${theme.color.main};
    ${theme.style.boxShadow}: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
      0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  }
`;
