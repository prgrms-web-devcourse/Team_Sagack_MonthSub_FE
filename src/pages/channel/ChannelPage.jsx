import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import {
  Wrapper,
  UserProfile,
  SectionTitle,
  SectionContainer,
  CardSlider,
  UserList,
  Button,
  Loading,
} from '@components';
import { getMyChannel, getChannel } from '@apis/channel';
import { useParams, useHistory } from 'react-router-dom';
import { postFollow, deleteFollow } from '@apis/follow';

const initialData = {
  user: {
    userId: 0,
    email: '',
    profileImage: '',
    profileIntroduce: '',
    nickname: '',
  },
  followIngCount: 0,
  followWriterList: [
    {
      userId: 0,
      writerId: 0,
      nickname: '',
      profileImage: '',
      subscribeStatus: '',
    },
  ],
  subscribeList: [
    {
      userId: 0,
      writerId: 0,
      seriesId: 0,
      nickname: '',
      thumbnail: '',
      title: '',
      introduceSentence: '',
      seriesStartDate: '',
      seriesEndDate: '',
      subscribeStatus: '',
      subscribeStartDate: '',
      subscribeEndDate: '',
      likes: 0,
      category: '',
    },
  ],
  followCount: 0,
  seriesPostList: [
    {
      userId: 0,
      writerId: 0,
      seriesId: 0,
      nickname: '',
      thumbnail: '',
      title: '',
      introduceSentence: '',
      seriesStartDate: '',
      seriesEndDate: '',
      subscribeStatus: '',
      subscribeStartDate: '',
      subscribeEndDate: '',
      likes: 0,
      category: '',
    },
  ],
};

const ChannelPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const history = useHistory();
  const { id } = useParams();

  const getInitialData = async () => {
    if (!id) {
      const { data } = await getMyChannel();

      if (!data) {
        history.push('/server-error');
        return;
      }

      setData(data);
    } else {
      const { data } = await getChannel(id);

      if (!data) {
        history.push('/server-error');
        return;
      }

      setData(data);
    }
  };

  const handleClick = () => {
    const id = data.user.writerId;
    data.isFollowed ? deleteFollow({ id }) : postFollow({ id });
    setData({
      ...data,
      isFollowed: !data.isFollowed,
    });
  };

  useEffect(() => {
    getInitialData();
    setLoading(false);
  }, [data.isFollowed]);

  return (
    <ChannelContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProfileWrapper>
            <ProfileContainer>
              <div>
                <UserProfile imageOnly src={data.user.profileImage} />
              </div>
              <div className="channel-introduce">
                <div>
                  <div>{data.user.nickname}</div>
                  <div className="writterTag">
                    {data.seriesPostList.length > 0 ? '작가' : '사용자'}
                  </div>
                  <div>
                    팔로워 : {data.followCount} | 팔로잉 : {data.followIngCount}
                  </div>
                  {id ? (
                    <Button type="button" onClick={handleClick}>
                      {data.isFollowed ? '팔로우 취소' : '팔로우 하기'}
                    </Button>
                  ) : null}
                </div>
                <div>{data.user.profileIntroduce}</div>
              </div>
            </ProfileContainer>
          </ProfileWrapper>
          <Wrapper className="customWrapper">
            <UserList
              list={data.followWriterList}
              title="팔로잉 한 작가들"
              moreLink={id ? `/follow/${id}` : '/follow/my'}
            />
            {!id ? (
              <SectionContainer>
                <SectionTitle>구독한 시리즈</SectionTitle>
                <CardSlider list={data.subscribeList} />
              </SectionContainer>
            ) : null}
            {data.seriesPostList.length > 0 ? (
              <SectionContainer>
                <SectionTitle>생성한 시리즈</SectionTitle>
                <CardSlider list={data.seriesPostList} />
              </SectionContainer>
            ) : null}
          </Wrapper>
        </>
      )}
    </ChannelContainer>
  );
};

export default ChannelPage;

const ChannelContainer = styled.div`
  .customWrapper {
    padding-top: 24rem;
  }
`;

const ProfileWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 15rem;
  background-color: ${theme.color.grey};
  margin-top: 5rem;
`;

const ProfileContainer = styled.div`
  width: 71.25rem;
  height: 100%;
  margin: 0 auto;
  display: flex;

  > div {
    display: flex;
    align-items: center;
  }

  > div:nth-of-type(1) {
    padding-right: 1.25rem;
  }

  > div:nth-of-type(2) {
    flex-grow: 1;
  }

  > div:nth-of-type(3) {
    align-items: flex-start;
    padding-top: 1.25rem;
  }

  .channel-introduce {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > div {
      width: 100%;
    }

    > div:nth-of-type(1) {
      font-size: ${theme.font.large};
      padding-bottom: 1.25rem;
      display: flex;
    }

    .writterTag {
      width: 3.75rem;
      height: ${theme.font.large};
      font-size: ${theme.font.base};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${theme.font.large};
      background-color: ${theme.color.main};
      margin-left: 0.625rem;
    }
  }

  .follows-wrap {
    width: 3.75rem;
    height: 3.75rem;
    display: flex;
    font-size: ${theme.font.small};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ffffff;
    margin-right: 0.625rem;
    line-height: ${theme.font.base};
  }

  .follows-wrap:nth-of-type(2) {
    margin-right: 0;
  }
`;
