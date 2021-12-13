import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  Wrapper,
  UserProfile,
  PageSectionTitle,
  PageSectionContainer,
  CardSlider,
} from '@components';
import { getMyChannel, getChannel } from '@apis/channel';
import { useParams } from 'react-router-dom';

const ChannelPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const thisRef = useRef();

  const getInitialData = async () => {
    thisRef.current = null;

    if (id === 'my') {
      const response = await getMyChannel();
      thisRef.current = response;
      setData(thisRef.current);
    } else {
      const response = await getChannel(id);
      thisRef.current = response;
      setData(thisRef.current);
    }
  };

  const isEmpty = param => {
    if (!param) {
      return true;
    }
    return false;
  };

  const userStatus = () => {
    if (thisRef.current.seriesPostList.length === 0) {
      return '사용자';
    }
    return '작가';
  };

  useEffect(() => {
    getInitialData();
  }, [id]);

  if (!isEmpty(thisRef.current)) {
    return (
      <>
        <ProfileWrapper>
          <ProfileContainer>
            <div>
              <UserProfile imageOnly src={data.user.profileImage} />
            </div>
            <div className="channel-introduce">
              <div>
                <div>{data.user.nickname}</div>
                <div className="writterTag">{userStatus()}</div>
              </div>
              <div>{data.user.profileIntroduce}</div>
            </div>
            <div>
              <div className="follows-wrap">
                <div>32</div>
                팔로잉
              </div>
              <div className="follows-wrap">
                <div>100</div>
                팔로워
              </div>
            </div>
          </ProfileContainer>
        </ProfileWrapper>

        <Wrapper>
          <PageSectionTitle text="팔로우 한 작가들" />
          <PageSectionContainer>
            <WriterContainer>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
              <WriterWrapper>
                <div className="channel-writer">
                  <div />
                  <div>닉네임</div>
                </div>
              </WriterWrapper>
            </WriterContainer>
          </PageSectionContainer>

          {id === 'my' ? (
            <>
              <PageSectionTitle text="관심 시리즈" />
              <PageSectionContainer>
                <CardSlider list={data.likeList} />
              </PageSectionContainer>

              <PageSectionTitle text="구독한 시리즈" />
              <PageSectionContainer>
                <CardSlider list={data.subscribeList} />
              </PageSectionContainer>
            </>
          ) : null}
          {userStatus() === '작가' ? (
            <>
              <PageSectionTitle text="생성한 시리즈" />
              <PageSectionContainer>
                <CardSlider list={data.seriesPostList} />
              </PageSectionContainer>
            </>
          ) : null}
        </Wrapper>
      </>
    );
  }
  return '';
};

export default ChannelPage;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 15rem;
  background-color: #eaeaea;
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
      font-size: 1.5rem;
      padding-bottom: 1.25rem;
      display: flex;
    }

    .writterTag {
      width: 3.75rem;
      height: 1.5rem;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1.5rem;
      background-color: #ffb15c;
      margin-left: 0.625rem;
    }
  }

  .follows-wrap {
    width: 3.75rem;
    height: 3.75rem;
    display: flex;
    font-size: 0.875rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ffffff;
    margin-right: 0.625rem;
    line-height: 1rem;
  }

  .follows-wrap:nth-of-type(2) {
    margin-right: 0;
  }
`;

const WriterContainer = styled.div`
  display: flex;
`;

const WriterWrapper = styled.div`
  .channel-writer {
    display: inline-block;
    text-align: center;
    padding-right: 1.78rem;

    > div:nth-of-type(1) {
      background-color: #bdbdbd;
      width: 5.5rem;
      height: 5.5rem;
      border-radius: 5.5rem;
      margin-bottom: 0.625rem;
    }
  }
`;
