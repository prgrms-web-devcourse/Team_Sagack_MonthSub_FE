import React from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Button, SectionContainer } from '@components';

const UserList = ({ list, title, moreLink, ...props }) => (
  <SectionContainer
    {...props}
    title={title}
    titleItem={
      <div className="seeMore">
        {moreLink ? (
          list.length > 10 ? (
            <Link to={moreLink}>
              <Button margin={0} width="6.25rem" height="1.875rem">
                더보기
              </Button>
            </Link>
          ) : null
        ) : null}
      </div>
    }
  >
    <UserListBody>
      {list.map(item => (
        <UserListWrapper key={item.userId}>
          <Link to={`/channel/${item.userId}`}>
            <div className="channel-writer">
              <UserProfile
                isStatusOn={item.subscribeStatus === 'SUBSCRIPTION_AVAILABLE'}
              >
                <Image
                  src={item.profileImage}
                  alt="프로필 이미지"
                  width="auto"
                  height="100%"
                />
              </UserProfile>
              <div>{item.nickname}</div>
            </div>
          </Link>
        </UserListWrapper>
      ))}
    </UserListBody>
  </SectionContainer>
);

UserList.defaultProps = {
  list: [],
  title: '',
  moreLink: '',
};

UserList.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  moreLink: PropTypes.string,
};

export default UserList;

const UserListBody = styled.div`
  display: flex;
`;

const UserListWrapper = styled.div`
  .channel-writer {
    display: inline-block;
    text-align: center;
    margin-right: 1.78rem;

    > div:nth-of-type(1) {
      background-color: ${theme.color.grey};
      width: 5.5rem;
      height: 5.5rem;
      border-radius: 5.5rem;
      margin-bottom: 0.625rem;
      overflow: hidden;
    }
  }
`;

const UserProfile = styled.div`
  ${({ isStatusOn }) =>
    isStatusOn
      ? `
        padding: 0;
        border: 0.25rem solid transparent;
        background-image: linear-gradient(transparent, transparent), linear-gradient(to right, #ff0077, #ffb15c);
        background-origin: border-box;
        background-clip: content-box, border-box;
      `
      : 'none'};
`;
