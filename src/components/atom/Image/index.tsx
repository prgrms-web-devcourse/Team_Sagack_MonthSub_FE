import React from 'react';
import styled from '@emotion/styled';
import type { ImgHTMLAttributes, ReactElement } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  src?: string;
  placeholder?: string;
}

const DEFAULT_PROFILE_IMAGE =
  'https://monthsub-image.s3.ap-northeast-2.amazonaws.com/users/default/defaultProfile.jpg';

const Image = ({
  src,
  width,
  height,
  alt,
  placeholder,
  ...props
}: ImageProps): ReactElement => (
  <StyledImg
    src={src || DEFAULT_PROFILE_IMAGE}
    alt={alt}
    width={width}
    height={height}
    placeholder={placeholder}
    {...props}
  />
);

Image.defaultProps = {
  width: 0,
  height: 0,
  src: DEFAULT_PROFILE_IMAGE,
  placeholder: DEFAULT_PROFILE_IMAGE,
};

export default Image;

const StyledImg = styled.img`
  object-fit: cover;
  object-position: center center;
`;
