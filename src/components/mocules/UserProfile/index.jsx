import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Image } from '@atom';
import theme from '@styles/theme';
import { Link } from 'react-router-dom';

const UserProfile = ({
  src,
  size,
  userId,
  nickname,
  imageOnly,
  isSubscribeable,
  useType,
  ...props
}) => {
  const processedSize = typeof size === 'number' ? `${size}rem` : size;

  return (
    <Link to={`/channel/${userId}`} {...props}>
      <ProfileContainer useType={useType}>
        <ProfileWrapper
          size={processedSize}
          isSubscribeable={isSubscribeable}
          useType={useType}
        >
          <Image src={src} width="auto" height="100%" alt="user-profile" />
        </ProfileWrapper>
        {!imageOnly ? <Nickname useType={useType}>{nickname}</Nickname> : null}
      </ProfileContainer>
    </Link>
  );
};

UserProfile.defaultProps = {
  src: 'https://monthsub-image.s3.ap-northeast-2.amazonaws.com/users/default/defaultProfile.jpg',
  size: 1,
  nickname: '닉네임이 출력됩니다.',
  imageOnly: false,
  isSubscribeable: false,
  useType: 'list',
};

UserProfile.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nickname: PropTypes.string,
  imageOnly: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  isSubscribeable: PropTypes.bool,
  useType: PropTypes.string,
};

export default UserProfile;

const ProfileContainer = styled.div`
  display: ${({ useType }) =>
    useType === 'profile' ? 'inline-flex' : 'block'};
`;

const ProfileWrapper = styled.div`
  background-color: ${theme.color.grey};
  overflow: hidden;

  ${({ size, useType }) => `
      width: ${size};
      height: ${size};
      border-radius: ${size};
      margin-right: ${useType === 'profile' ? `calc(${size} / 4)` : null};
    `};

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

const Nickname = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;

  ${({ useType }) =>
    useType === 'profile'
      ? `
      margin-top: 0;
        width: auto;
      `
      : null};
`;
