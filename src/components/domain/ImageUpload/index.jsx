import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Upload, Button } from '@components';
import theme from '@styles/theme';
import { css } from '@emotion/react';

// const DEFAULT_PROFILE_IMAGE =
//   'https://monthsub-image.s3.ap-northeast-2.amazonaws.com/users/default/monthsub_default_profile.jpg';

const ImageUpload = ({
  onChange,
  buttonName,
  circle,
  src,
  name,
  wide,
  ...props
}) => (
  <Container wide={wide} {...props}>
    <UploadImage fileImageUrl={src || ''} circle={circle} wide={wide} />
    <ImageCover wide={wide} />
    <StyledUpload onChange={onChange} name={name} wide={wide}>
      <StyledButton wide={wide} width="6.25rem">
        file upload
      </StyledButton>
    </StyledUpload>
  </Container>
);

ImageUpload.defaultProps = {
  onChange: () => {},
  circle: false,
  buttonName: 'File Select',
  src: '',
  name: '',
  wide: false,
};

ImageUpload.propTypes = {
  onChange: PropTypes.func,
  circle: PropTypes.bool,
  buttonName: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
  wide: PropTypes.number,
};

export default ImageUpload;

const Container = styled.div`
  position: relative;
  width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ wide }) =>
    wide &&
    css`
      position: relative;
      width: 100%;
    `}
`;

const StyledUpload = styled(Upload)`
  ${({ wide }) =>
    wide &&
    css`
      position: absolute;
      top: 50%;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    `}
`;

const StyledButton = styled(Button)`
  padding: 0.5rem;
  font-weight: 700;
  user-select: none;
  border-radius: 50px;
  border: none;
  color: ${theme.color.main};
  box-shadow: ${theme.style.boxShadow};
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: ${theme.color.main};
  }
  ${({ wide }) =>
    wide &&
    css`
      width: 8rem;
      padding: 0.7rem 0;
    `}
`;

const UploadImage = styled.div`
  width: 100%;
  height: 10rem;
  background-image: url(${({ fileImageUrl }) => fileImageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: ${({ circle }) => (circle ? '100px' : '4px')};
  background-color: ${theme.color.greyLight};
  margin-bottom: 0.8rem;
  ${({ wide }) =>
    wide &&
    css`
      margin-top: 0;
      height: 30rem;
    `}
`;

const ImageCover = styled.div`
  display: none;
  ${({ wide }) =>
    wide &&
    css`
      position: absolute;
      display: block;
      width: 100%;
      height: 30rem;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    `}
`;
