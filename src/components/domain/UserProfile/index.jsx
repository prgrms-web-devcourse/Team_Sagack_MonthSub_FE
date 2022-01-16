import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Image } from '@components';
import theme from '@styles/theme';
import { Link } from 'react-router-dom';

const UserProfile = ({
  src,
  size,
  userId,
  nickname,
  fontSize,
  imageOnly,
  isSubscribeable,
  ...props
}) => (
  <Link to={`/channel/${userId}`} {...props}>
    <ProfileContainer>
      <ProfileWrapper size={size} isSubscribeable={isSubscribeable}>
        <Image src={src} width="auto" height="100%" alt="user-profile" />
      </ProfileWrapper>
      {!imageOnly ? <Nickname fontSize={fontSize}>{nickname}</Nickname> : null}
    </ProfileContainer>
  </Link>
);

UserProfile.defaultProps = {
  src: '이미지 경로',
  size: 1,
  nickname: '닉네임이 출력됩니다.',
  fontSize: theme.font.base,
  imageOnly: false,
  isSubscribeable: false,
};

UserProfile.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nickname: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageOnly: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  isSubscribeable: PropTypes.bool,
};

export default UserProfile;

const ProfileContainer = styled.div``;

const Nickname = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}rem` : fontSize};
  margin-top: 0.75rem;
`;

const ProfileWrapper = styled.div`
  width: ${({ size }) => (typeof size === 'number' ? `${size}rem` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}rem` : size)};
  border-radius: ${({ size }) =>
    typeof size === 'number' ? `${size}rem` : size};
  overflow: hidden;
  background-color: ${theme.color.grey};

  ${({ isSubscribeable }) =>
    isSubscribeable
      ? `
        padding: 0;
        border: 0.25rem solid transparent;
        background-image: linear-gradient(transparent, transparent), linear-gradient(to right, #ff0077, #ffb15c);
        background-origin: border-box;
        background-clip: content-box, border-box;
      `
      : 'none'};
`;
