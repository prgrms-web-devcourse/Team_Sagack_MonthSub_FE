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

export default InputFile;

InputFile.defaultProps = {
  children: '',
  name: '',
  accept: '.jpg, .png, .jpeg',
  value: '',
  disabled: false,
  onChange: () => {},
};

InputFile.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  accept: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

const Input = styled.input`
  display: none;
`;
