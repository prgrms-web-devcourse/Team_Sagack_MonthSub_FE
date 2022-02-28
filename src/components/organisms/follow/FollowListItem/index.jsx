import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { UserProfile } from '@molecules';
import theme from '@styles/theme';
import { Link } from 'react-router-dom';

const FollowListItem = ({
  src,
  nickname,
  intro,
  followCount,
  writerId,
  ...props
}) => (
  <StyledContainer {...props}>
    <Follower>
      <Link to={`/channel/${writerId}`}>
        <UserProfile src={src} size={5} imageOnly />
        <FollowInfo>
          <div className="nickname">{nickname}</div>
          <div className="intro">{intro}</div>
        </FollowInfo>
      </Link>
    </Follower>
    <FollowCount>
      팔로워 &#40;{followCount.toLocaleString('ko-KR')}&#41;
    </FollowCount>
  </StyledContainer>
);

FollowListItem.defaultProps = {
  src: '',
  nickname: '',
  intro: '',
  followCount: 0,
  writerId: 0,
};

FollowListItem.propTypes = {
  src: PropTypes.string,
  nickname: PropTypes.string,
  intro: PropTypes.string,
  followCount: PropTypes.number,
  writerId: PropTypes.number,
};

export default FollowListItem;

const StyledContainer = styled.div`
  width: 100%;
  height: 150px;
  padding: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.color.grey};

  &:last-of-type {
    border-bottom: none;
  }
`;

const Follower = styled.div`
  flex-grow: 1;

  > a {
    display: flex;
    align-items: center;
  }
`;

const FollowInfo = styled.div`
  padding-left: 15px;

  .nickname {
    font-size: ${theme.font.large};
    margin-bottom: 5px;
  }
`;

const FollowCount = styled.div`
  font-weight: bold;
  width: 200px;
  text-align: right;
`;
