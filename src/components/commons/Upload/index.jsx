import React, { useRef, useState } from 'react';
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
  const [file, setFile] = useState(value);
  const inputRef = useRef(null);

  const handleFileChange = e => {
    const { files } = e.target;
    const changedFile = files[0];
    if (onChange) {
      setFile(changedFile);
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
      {typeof children === 'function' ? children(file) : children}
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
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
