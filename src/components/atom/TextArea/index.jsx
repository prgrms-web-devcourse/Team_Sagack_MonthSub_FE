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
    <Container width={width} {...props}>
      <StyledTextArea
        width={width}
        height={height}
        disabled={disabled}
        value={value}
        name={name}
        onChange={handleChange}
        {...props}
      />
    </Container>
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

const Container = styled.div`
  width: ${({ width }) => width};
`;
const StyledTextArea = styled.textarea`
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  padding: 0.7rem;
  font-size: 1rem;
  border: 0.063rem solid ${theme.color.greyMedium};
  border-radius: 0.2rem;
  resize: none;
  line-height: 1.7rem;
  background-color: #ffffff;
  &:focus {
    outline: 0.063rem solid ${theme.color.main};
  }
`;
