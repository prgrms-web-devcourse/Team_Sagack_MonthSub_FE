import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Upload } from '@components';
import theme from '@styles/theme';

const DEFAULT_PROFILE_IMAGE =
  'https://monthsub-image.s3.ap-northeast-2.amazonaws.com/users/default/monthsub_default_profile.jpg';

const ImageUpload = ({ onChange, buttonName, circle, src, name }) => (
  <Container>
    <UploadImage fileImageUrl={src || DEFAULT_PROFILE_IMAGE} circle={circle} />
    <StyledUpload onChange={onChange} name={name}>
      <button type="button">{buttonName}</button>
    </StyledUpload>
  </Container>
);

ImageUpload.defaultProps = {
  onChange: () => {},
  circle: false,
  buttonName: 'File Select',
  src: '',
  name: '',
};

ImageUpload.propTypes = {
  onChange: PropTypes.func,
  circle: PropTypes.bool,
  buttonName: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
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
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
    border-radius: 50px;
    border: none;
    color: ${({ isFile }) =>
      isFile ? theme.color.main : theme.color.greyDark};
    box-shadow: ${theme.style.boxShadow};
    background-color: #fff;
    text-align: center;
    &:hover {
      color: ${theme.color.main};
    }
    &:active {
      background-color: ${theme.color.main};
      color: #fff;
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
