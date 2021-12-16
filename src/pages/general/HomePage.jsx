import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Wrapper, ImageCard, Image, Title, CardList } from '@components';
import { getMain } from '@apis/user';
import { Link } from 'react-router-dom';

const initialValues = {
  popularSeriesList: [
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
  popularWriterList: [
    {
      userId: 0,
      writerId: 0,
      nickname: '',
      profileImage: '',
      subscribeStatus: '',
    },
  ],
  recentSeriesList: [
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

const HomePage = () => {
  const [values, setValues] = useState(initialValues);

  const getInitialData = async () => {
    const { data } = await getMain();
    setValues(data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <>
      <PopularSeriesContainer>
        {values.popularSeriesList.map(
          ({ nickname, title, introduceSentence, thumbnail, seriesId }) => (
            <ImageCard
              id={seriesId}
              key={seriesId}
              src={thumbnail}
              nickname={nickname}
              title={title}
              introduceSentence={introduceSentence}
            />
          ),
        )}
      </PopularSeriesContainer>
      <Wrapper>
        <Title name="인기 작가" h2 />
        <PopularWriterContainer>
          {values.popularWriterList.map(
            ({ nickname, profileImage, writerId }) => (
              <WriterProfile key={writerId} to={`/channel/${writerId}`}>
                <ProfileImage src={profileImage} alt="미리보기" />
                <span>{nickname}</span>
              </WriterProfile>
            ),
          )}
        </PopularWriterContainer>
        <Title name="최근 시리즈" h2 />
        <RecentSeriesContainer>
          <CardList list={values.recentSeriesList} />
        </RecentSeriesContainer>
      </Wrapper>
    </>
  );
};

export default HomePage;

const PopularSeriesContainer = styled.div`
  padding-top: 5rem;
  display: flex;
`;
const PopularWriterContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  height: 100%;
  display: flex;
  padding: 2rem 0;
`;
const RecentSeriesContainer = styled.div`
  padding: 2rem 0;
`;

const WriterProfile = styled(Link)`
  width: 20%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;
