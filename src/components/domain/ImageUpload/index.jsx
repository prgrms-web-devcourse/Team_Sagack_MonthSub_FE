import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Upload, Title } from '@components';

const ImageUpload = ({
  onChange,
  valuename,
  buttonName,
  circle,
  title,
  url,
}) => {
  const [fileImageUrl, setfileImageUrl] = useState('');

  const getfileImageUrl = file => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setfileImageUrl(fileReader.result);
    };
  };

  const handleChangefile = file => {
    onChange && onChange(file);
    file ? getfileImageUrl(file) : setfileImageUrl('');
  };

  return (
    <>
      <Title style={{ display: title ? 'block' : 'none' }} name={title} />
      <Container>
        <UploadImage fileImageUrl={url || fileImageUrl} circle={circle} />
        <StyledUpload valuename={valuename} onChange={handleChangefile}>
          <button type="button">{buttonName}</button>
        </StyledUpload>
      </Container>
    </>
  );
};

ImageUpload.defaultProps = {
  onChange: () => {},
  valuename: '',
  circle: false,
  buttonName: 'File Select',
  title: '',
  url: '',
};

ImageUpload.propTypes = {
  onChange: PropTypes.func,
  valuename: PropTypes.string,
  circle: PropTypes.bool,
  buttonName: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};

export default ImageUpload;

const Container = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledUpload = styled(Upload)`
  button {
    width: 6.25rem;
    padding: 0.3rem;
    cursor: pointer;
    user-select: none;
    border-radius: 50px;
    border: none;
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

const UploadImage = styled.div`
  width: 100%;
  height: 10rem;
  background-image: url(${({ fileImageUrl }) => fileImageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: ${({ circle }) => (circle ? '100px' : '4px')};
  background-color: #949494;
  margin-bottom: 0.8rem;
`;
