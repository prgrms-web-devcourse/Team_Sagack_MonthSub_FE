import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Image } from '@components';
import theme from '@styles/theme';

const UserProfile = ({
  src,
  size,
  nickname,
  fontSize,
  imageOnly,
  ...props
}) => (
  <ProfileContainer>
    <ProfileWrapper size={size}>
      <Image
        src={src}
        width="auto"
        height="100%"
        alt="user-profile"
        {...props}
      />
    </ProfileWrapper>
    {!imageOnly ? (
      <Nickname fontSize={fontSize} {...props}>
        {nickname}
      </Nickname>
    ) : null}
  </ProfileContainer>
);

UserProfile.defaultProps = {
  src: '이미지 경로',
  size: 1,
  nickname: '닉네임이 출력됩니다.',
  fontSize: theme.font.base,
  imageOnly: false,
};

UserProfile.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nickname: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageOnly: PropTypes.bool,
};

export default UserProfile;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nickname = styled.span`
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}rem` : fontSize};
  margin-left: 15px;
`;

const ProfileWrapper = styled.div`
  width: ${({ size }) => (typeof size === 'number' ? `${size}rem` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}rem` : size)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ size }) =>
    typeof size === 'number' ? `${size}rem` : size};
  overflow: hidden;
`;
