import React from 'react';
import styled from '@emotion/styled';
import { Upload, Button } from '@atom';
import { theme, mixin } from '@styles';
import { css } from '@emotion/react';
import type { HTMLAttributes, ReactElement, ChangeEventHandler } from 'react';

interface ImageUploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  buttonName?: string;
  circle?: boolean;
  src?: string;
  name?: string;
  wide?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  fileImageUrl?: string;
}

const ImageUpload = ({
  onChange,
  buttonName,
  circle,
  src,
  name,
  wide,
  ...props
}: ImageUploadProps): ReactElement => (
  <Container wide={wide} {...props}>
    <UploadImage fileImageUrl={src} circle={circle} wide={wide} />
    <ImageCover wide={wide} />
    <StyledUpload onChange={onChange} name={name} wide={wide}>
      <StyledButton type="button" wide={wide} width="6.25rem">
        {buttonName}
      </StyledButton>
    </StyledUpload>
  </Container>
);

ImageUpload.defaultProps = {
  buttonName: 'File Select',
  circle: false,
  src: '',
  name: '',
  wide: false,
  onChange: () => {
    return '';
  },
  fileImageUrl: '',
};

export default ImageUpload;

const Container = styled.div<ImageUploadProps>`
  position: relative;
  width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ wide }) => wide && mixin.fullScreen}
`;

const StyledUpload = styled(Upload)<ImageUploadProps>`
  ${({ wide }) =>
    wide &&
    css`
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    `}
`;

const StyledButton = styled(Button)<ImageUploadProps>`
  width: 8rem;
  padding: 0.5rem 0.2rem;
  font-size: 1rem;
  color: ${theme.color.greyDark};
  user-select: none;
  border-radius: 50px;
  border: none;
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
      color: ${theme.color.main};
      font-weight: 700;
    `}
`;

const UploadImage = styled.div<ImageUploadProps>`
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
      margin: 0;
      height: 100%;
    `}
`;

const ImageCover = styled.div<ImageUploadProps>`
  display: none;
  ${({ wide }) =>
    wide &&
    css`
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    `}
`;
