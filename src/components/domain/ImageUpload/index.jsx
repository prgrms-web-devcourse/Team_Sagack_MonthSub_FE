import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Upload, Image } from '@components';

const ImageUpload = ({ onChange, name }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState({});

  const handleChangefile = file => {
    setFile(file);
    onChange && onChange(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };
  };

  return (
    <div>
      <UploadImage src={imageUrl} alt={name} />
      <StyledUpload name={name} onChange={handleChangefile}>
        <button type="button">File Select</button>
      </StyledUpload>
      <span>{file ? file.name : ''}</span>
    </div>
  );
};

ImageUpload.defaultProps = {
  onChange: () => {},
  name: '',
};

ImageUpload.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default ImageUpload;

const UploadImage = styled(Image)`
  width: 10rem;
  height: 10rem;
`;

const StyledUpload = styled(Upload)`
  display: flex;
  align-items: center;
  button {
    width: 6.25rem;
    padding: 0.3rem;
    cursor: pointer;
    user-select: none;
    border-radius: 50px;
    border: none;
    margin-right: 0.5rem;
    color: ${({ isFile }) => (isFile ? '#ffb15c' : '#4b4b4b')};
    box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
      0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
    background-color: #fff;
    text-align: center;
    &:hover {
      color: #ffb15c;
    }
  }
`;
