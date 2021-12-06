import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const InputFile = ({
  children,
  name,
  accept,
  value,
  onChange,
  disabled,
  isFile,
  ...props
}) => {
  const inputRef = useRef(null);

  const handleFileChange = e => {
    const { files } = e.target;
    const changedFile = files[0];
    if (onChange) {
      onChange(changedFile);
    }
  };

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div onClick={handleChooseFile} {...props}>
      <Input
        type="file"
        ref={inputRef}
        name={name}
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled && disabled}
      />
      {children}
    </div>
  );
};

InputFile.defaultProps = {
  children: '',
  name: '',
  accept: '.jpg, .png, .jpeg',
  disabled: false,
  value: '',
  onChange: () => {},
  isFile: false,
};

InputFile.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  accept: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isFile: PropTypes.bool,
};

export default InputFile;

const Input = styled.input`
  display: none;
`;
