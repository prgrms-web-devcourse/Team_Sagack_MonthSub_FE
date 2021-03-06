import React from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import type { TextareaHTMLAttributes, ReactElement } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string | number;
  height?: string | number;
  textRef?: React.RefObject<HTMLTextAreaElement>;
}

const TextArea = ({
  width,
  height,
  disabled,
  name,
  value,
  onChange,
  textRef,
  ...props
}: TextareaProps): ReactElement => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
  };

  return (
    <StyledTextArea
      ref={textRef}
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
  textRef: undefined,
};

export default TextArea;

const StyledTextArea = styled.textarea<TextareaProps>`
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
