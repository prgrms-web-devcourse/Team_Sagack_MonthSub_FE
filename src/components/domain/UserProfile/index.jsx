import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  Image
} from '@components'

const UserProfile = ({ src, size, nickname, fontSize, imageOnly, ...props }) => {
  let name = '';
  
  if (imageOnly !== true) {
    name = nickname;
  }
  
  return (
    <ProfileContainer {...props}>
      <div>
        <div className="thumbnail">
          <Image src={ src } width='100%' height='100%' />
        </div>
        <div>{ name }</div>
      </div>
    </ProfileContainer>
  );
};

UserProfile.defaultProps = {
  src: '',
  size: '',
  nickname: 'nickname',
  fontSize: '1rem',
  imageOnly: false,
}

UserProfile.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nickname: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageOnly: PropTypes.bool,
}

const ProfileContainer = styled.div`
  > div {
    display: flex;
    align-items: center;
  }

  .thumbnail {
    width: 7rem;
    height: 7rem;
    background-color: grey;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.3125rem;
  }
`;

export default UserProfile;