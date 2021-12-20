import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Title } from '@components';
import theme from '@styles/theme';

const TextArea = ({
  width,
  height,
  disabled,
  name,
  value,
  title,
  onChange,
  ...props
}) => {
  const handleChange = () => {
    onChange && onChange();
  };

  return (
    <Container width={width} {...props}>
      <Title style={{ display: title ? 'block' : 'none' }} name={title} />
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
  title: '',
  onChange: () => {},
};

TextArea.propTypes = {
  title: PropTypes.string,
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
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 0.2rem;
  resize: none;
  line-height: 1.4rem;
  box-shadow: ${theme.style.boxShadow};
  &:focus {
    background-color: #ffffff;
    outline: 0.063rem solid ${theme.color.main};
  }
`;
