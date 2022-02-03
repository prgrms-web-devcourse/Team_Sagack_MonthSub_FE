import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Upload = ({
  children,
  name,
  accept,
  value,
  onChange,
  disabled,
  ...props
}) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(value);

  const handleFileChange = e => {
    const { files } = e.target;
    const changedFile = files[0];
    setFile(changedFile);
    if (onChange) {
      onChange(e);
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
        value={value}
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled && disabled}
      />
      {typeof children === 'function' ? children(file) : children}
    </div>
  );
};

Upload.defaultProps = {
  children: '',
  name: '',
  accept: '.jpg, .png, .jpeg',
  disabled: false,
  value: '',
  onChange: () => {},
};

Upload.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  name: PropTypes.string,
  accept: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Upload;

const Input = styled.input`
  display: none;
`;
