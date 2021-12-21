import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import {
  Wrapper,
  SectionTitle,
  SectionContainer,
  UserProfile,
  CardSlider,
  UserList,
  Loading,
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
  const { id } = useParams();
  const history = useHistory();

  const getInitialData = async () => {
    if (!id) {
      const { data } = await getMyChannel();
      setData(data);
    } else {
      const { data } = await getChannel(id);
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
  }, [id]);

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
            <ProfileMain>
              <ProfileContainer>
                <UserProfile
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
                    bgColor={data.isFollowed ? theme.color.red : '#5cb85c'}
                  >
                    {data.isFollowed ? '언팔로우' : '+ 팔로우'}
                  </StyledButton>
                </div>
              ) : null}
            </ProfileBottom>
          </ProfileWrapper>

          <Wrapper className="customWrapper">
            {data.followWriterList.length > 0 ? (
              <SectionContainer>
                <UserList
                  list={data.followWriterList}
                  title="팔로우한 작가들"
                  moreLink={id ? `/follow/${id}` : '/follow/my'}
                />
              </SectionContainer>
            ) : !id ? (
              <SectionContainer>
                <SectionTitle>팔로우한 작가들</SectionTitle>
                <NoContents>
                  팔로우한 작가가 없습니다. 마음에 드는 작가를 팔로우 해보세요.
                </NoContents>
              </SectionContainer>
            ) : null}
            {!id ? (
              data.subscribeList.length > 0 ? (
                <SectionContainer>
                  <SectionTitle>구독한 시리즈</SectionTitle>
                  <CardSlider list={data.subscribeList} />
                </SectionContainer>
              ) : (
                <SectionContainer>
                  <SectionTitle>구독한 시리즈</SectionTitle>
                  <NoContents>
                    구독한 시리즈가 없습니다. 마음에 드는 시리즈를 찾아보세요.
                  </NoContents>
                </SectionContainer>
              )
            ) : null}
            {data.seriesPostList.length > 0 ? (
              <SectionContainer>
                <SectionTitle>작성한 시리즈</SectionTitle>
                <CardSlider list={data.seriesPostList} />
              </SectionContainer>
            ) : !id ? (
              <SectionContainer>
                <SectionTitle>작성한 시리즈</SectionTitle>
                <NoContents>
                  작성한 시리즈가 없습니다. 새로운 시리즈를 작성해보세요.
                </NoContents>
              </SectionContainer>
            ) : null}
          </Wrapper>
        </>
      )}
    </ChannelContainer>
  );
};

export default ChannelPage;

const ProfileAreaHeight = '27rem';

const ChannelContainer = styled.div`
  .customWrapper {
    margin-top: calc(${ProfileAreaHeight} + ${theme.common.navHeight});
  }
`;

const ProfileWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${ProfileAreaHeight};
  margin-top: ${theme.common.navHeight};
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
  background-color: ${({ bgColor }) => bgColor};
  color: #ffffff;
  font-size: 1rem;
`;

const NoContents = styled.div`
  background-color: ${theme.color.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  height: 160px;
`;
