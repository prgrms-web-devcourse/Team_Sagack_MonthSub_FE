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
  isSubscribeAble,
  requestForm,
  ...props
}) => {
  const processedSize = typeof size === 'number' ? `${size}rem` : size;

  return (
    <Link to={`/channel/${userId}`} {...props}>
      <ProfileContainer requestForm={requestForm}>
        <ProfileImageWrapper
          size={processedSize}
          isSubscribeAble={isSubscribeAble}
          requestForm={requestForm}
        >
          <Image src={src} width="auto" height="100%" alt="user-profile" />
        </ProfileImageWrapper>
        {!imageOnly ? (
          <Nickname requestForm={requestForm}>{nickname}</Nickname>
        ) : null}
      </ProfileContainer>
    </Link>
  );
};

UserProfile.defaultProps = {
  src: '',
  size: 1,
  nickname: '닉네임이 출력됩니다.',
  imageOnly: false,
  isSubscribeAble: false,
  requestForm: 'list',
};

UserProfile.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nickname: PropTypes.string,
  imageOnly: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  isSubscribeAble: PropTypes.bool,
  requestForm: PropTypes.string,
};

export default UserProfile;

const ProfileContainer = styled.div`
  display: ${({ requestForm }) =>
    requestForm === 'profile' ? 'inline-flex' : 'block'};
`;

const ProfileImageWrapper = styled.div`
  background-color: ${theme.color.grey};
  overflow: hidden;

  ${({ size, requestForm }) => `
      width: ${size};
      height: ${size};
      border-radius: ${size};
      margin-right: ${requestForm === 'profile' ? `calc(${size} / 4)` : null};
    `};

  ${({ isSubscribeAble }) =>
    isSubscribeAble
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

  ${({ requestForm }) =>
    requestForm === 'profile'
      ? `
      margin-top: 0;
        width: auto;
      `
      : null};
`;
