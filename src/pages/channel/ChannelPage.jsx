import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { theme, mixin } from '@styles';
import {
  Wrapper,
  SectionContainer,
  UserProfile,
  CardSlider,
  UserList,
  Loading,
  NoData,
} from '@components';
import { getMyChannel, getChannel } from '@apis/channel';
import { useParams, useHistory } from 'react-router-dom';
import { postFollow, deleteFollow } from '@apis/follow';
import cover from './channel_cover.jpg';

const initialData = {
  user: {
    userId: 0,
    email: '',
    profileImage: '',
    profileIntroduce: '',
    nickname: '',
  },
  isMine: null,
  isFollowed: null,
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
  subscribeList: [
    {
      isLiked: true,
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
      if (data.isMine) {
        history.push('/channel/my');
      } else {
        setData(data);
      }
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
  }, [id, data.isFollowed]);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProfileWrapper>
            <ProfileMain>
              <ProfileContainer>
                <UserProfile
                  userId={data.user.userId}
                  src={data.user.profileImage}
                  size={7}
                  nickname={data.user.nickname}
                  imageOnly
                />
                <UserInfo>
                  <div className="nickname">{data.user.nickname}</div>
                  <div className="intro">{data.user.profileIntroduce}</div>
                </UserInfo>
              </ProfileContainer>
            </ProfileMain>
            <ProfileBottom>
              <div>
                <span>팔로워</span> &#40;
                {data.followCount.toLocaleString('ko-KR')}&#41;
              </div>
              <div>
                <span>팔로잉</span> &#40;
                {data.followIngCount.toLocaleString('ko-KR')}&#41;
              </div>
              {id ? (
                <div>
                  <StyledButton
                    type="button"
                    onClick={handleClick}
                    bgColor={data.isFollowed ? 'inherit' : '#5cb85c'}
                    isFollowed={data.isFollowed}
                  >
                    {data.isFollowed ? '언팔로우' : '+ 팔로우'}
                  </StyledButton>
                </div>
              ) : null}
            </ProfileBottom>
          </ProfileWrapper>

          {data.followWriterList.length > 0 ? (
            <UserList
              list={data.followWriterList}
              title="팔로우한 작가들"
              moreLink={id ? `/follow/${id}` : '/follow/my'}
            />
          ) : !id ? (
            <SectionContainer title="팔로우한 작가들">
              <NoData>
                팔로우한 작가가 없습니다. 마음에 드는 작가를 팔로우 해보세요.
              </NoData>
            </SectionContainer>
          ) : null}
          {!id ? (
            data.subscribeList.length > 0 ? (
              <SectionContainer title="구독한 시리즈">
                <CardSlider list={data.subscribeList} />
              </SectionContainer>
            ) : (
              <SectionContainer title="구독한 시리즈">
                <NoData>
                  구독한 시리즈가 없습니다. 마음에 드는 시리즈를 찾아보세요.
                </NoData>
              </SectionContainer>
            )
          ) : null}
          {data.seriesPostList.length > 0 ? (
            <SectionContainer title="작성한 시리즈">
              <CardSlider list={data.seriesPostList} />
            </SectionContainer>
          ) : !id ? (
            <SectionContainer title="작성한 시리즈">
              <NoData>
                작성한 시리즈가 없습니다. 새로운 시리즈를 작성해보세요.
              </NoData>
            </SectionContainer>
          ) : null}
        </>
      )}
    </Wrapper>
  );
};

export default ChannelPage;

const ProfileAreaHeight = '27rem';

const ProfileWrapper = styled.div`
  ${mixin.fullScreen}
  height: ${ProfileAreaHeight};
  background-image: url(${cover});
  background-repeat: no-repeat;
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  width: 71.25rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const UserInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .nickname {
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .intro {
    max-width: 70%;
    height: 80px;
    line-height: 1rem;
  }
`;

const ProfileMain = styled.div`
  flex: 1;
`;

const ProfileBottom = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.font.medium};
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);

  > div {
    margin-right: 20px;
  }
  > div:last-of-type {
    margin-right: 0;
  }
`;

const StyledButton = styled(`button`)`
  height: 30px;
  width: 90px;
  border-radius: 30px;
  border: 0.13rem solid #5cb85c;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ isFollowed }) => (isFollowed ? '#5cb85c' : `#fff`)};
  font-size: 1rem;
  font-weight: 700;
`;
