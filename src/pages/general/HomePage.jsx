import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Wrapper,
  CardList,
  CardSlider,
  SectionTitle,
  Loading,
  UserList,
} from '@components';
import { getMyPurchaseSeries } from '@apis/user';
import { getPopularWriters } from '@apis/auth';
import { getPopularSeries, getRecentSeries } from '@apis/series';

const popularSeriesListInit = [
  {
    isLiked: true,
    userId: 0,
    writerId: 0,
    seriesId: 0,
    nickname: 'string',
    thumbnail: 'string',
    title: 'string',
    introduceSentence: 'string',
    seriesStartDate: '2021-12-20',
    seriesEndDate: '2021-12-20',
    subscribeStatus: 'string',
    subscribeStartDate: '2021-12-20',
    subscribeEndDate: '2021-12-20',
    likes: 0,
    category: 'POEM',
  },
];

const popularWriterListInit = [
  {
    userId: 0,
    writerId: 0,
    nickname: '',
    profileImage: '',
    subscribeStatus: '',
  },
];

const recentSeriesListInit = [
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
];

const purChaseSeriesListInit = [
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
];

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const hasAuth = sessionStorage.getItem('authorization');

  const [popularSeriesList, setPopularSeriesList] = useState(
    popularSeriesListInit,
  );
  const [popularWriterList, setPopularWriterList] = useState(
    popularWriterListInit,
  );
  const [recentSeriesList, setRecentSeriesList] =
    useState(recentSeriesListInit);

  const [purChaseSeriesList, setPurChaseSeriesList] = useState(
    purChaseSeriesListInit,
  );

  const getInitialData = async () => {
    const popularSeriesResponse = await getPopularSeries();
    setPopularSeriesList(popularSeriesResponse.data.seriesList);

    const recentSeriesResponse = await getRecentSeries();
    setRecentSeriesList(recentSeriesResponse.data.seriesList);

    const popularWritersResponse = await getPopularWriters();
    setPopularWriterList(popularWritersResponse.data.popularWriterList);

    if (hasAuth) {
      const purChaseSeriesResponse = await getMyPurchaseSeries();
      setPurChaseSeriesList(purChaseSeriesResponse.data.seriesList);
    }

    setLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <HomepageContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <CardSlider
            list={popularSeriesList}
            parentOf="main"
            itemsCountOnRow={5}
            itemsCountOnCol={1}
          />
          <Wrapper className="customWrapper">
            <StyledUserList list={popularWriterList} title="인기 작가" />
            {hasAuth ? (
              <div>
                <SectionTitle>
                  <div>구독중인 시리즈</div>
                </SectionTitle>
                <RecentSeriesContainer>
                  <CardList list={purChaseSeriesList} />
                </RecentSeriesContainer>
              </div>
            ) : (
              ''
            )}
            <SectionTitle>
              <div>최신 시리즈</div>
            </SectionTitle>
            <RecentSeriesContainer>
              <CardList list={recentSeriesList} />
            </RecentSeriesContainer>
          </Wrapper>
        </>
      )}
    </HomepageContainer>
  );
};

export default HomePage;

const HomepageContainer = styled.div`
  .customWrapper {
    margin-top: 2rem;
  }
`;

const RecentSeriesContainer = styled.div`
  margin-bottom: 5rem;
`;

const StyledUserList = styled(UserList)`
  margin-bottom: 5rem;
`;
