import React, { useRef } from 'react';
import styled from '@emotion/styled';
import type { InputHTMLAttributes, ReactElement } from 'react';

interface UploadProps extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  accept?: string;
}

const Upload = ({
  children,
  name,
  accept,
  value,
  onChange,
  disabled,
  ...props
}: UploadProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChooseFile = () => {
    inputRef?.current?.click();
  };

  return (
    <div onClick={handleChooseFile} {...props}>
      <Input
        type="file"
        ref={inputRef}
        name={name}
        value={value}
        accept={accept}
        onChange={onChange}
        disabled={disabled && disabled}
      />
      {children}
    </div>
  );
};

Upload.defaultProps = {
  accept: '.jpg, .png, .jpeg',
};

export default Upload;

const Input = styled.input`
  display: none;
`;
