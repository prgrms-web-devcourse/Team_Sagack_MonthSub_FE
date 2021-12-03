import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const UserInfo = ({ nickname }) => (
  <UserInfoContainer>
    <div>
      <div className="thumbnail-small" />
      <div>{ nickname }</div>
    </div>
  </UserInfoContainer>
);

UserInfo.defaultProps = {
  nickname: 'nickname',
}

UserInfo.propTypes = {
  nickname: PropTypes.string,
}

const UserInfoContainer = styled.div`
  > div {
    display: flex;
    align-items: center;
  }

  .thumbnail-small {
    width: 2rem;
    height: 2rem;
    background-color: grey;
    border-radius: 50%;
    margin-right: 0.3125rem;
  }
`;

export default UserInfo;