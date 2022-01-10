import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, SectionContainer, UserProfile, NoData } from '@components';

const UserList = ({ list, title, moreLink, ...props }) => (
  <SectionContainer
    {...props}
    title={title}
    titleItem={
      <div className="seeMore">
        {moreLink ? (
          list.length === 10 ? (
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
      {list.length ? (
        list.map(item => (
          <StyledUserProfile
            src={item.profileImage}
            size={5}
            userId={item.userId}
            nickname={item.nickname}
            key={item.userId}
            isSubscribeable={item.subscribeStatus === 'SUBSCRIPTION_AVAILABLE'}
          />
        ))
      ) : (
        <NoData>유저 데이터가 존재하지 않습니다</NoData>
      )}
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
  align-items: center;
  min-height: 6.75rem;
`;

const StyledUserProfile = styled(UserProfile)`
  margin-right: 1.75rem;
`;
