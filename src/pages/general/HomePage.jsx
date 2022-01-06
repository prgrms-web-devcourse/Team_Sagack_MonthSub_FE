import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Wrapper,
  CardList,
  CardSlider,
  Loading,
  UserList,
  SectionContainer,
} from '@components';
import { getMyPurchaseSeries } from '@apis/user';
import { getPopularWriters } from '@apis/auth';
import { getPopularSeries, getRecentSeries } from '@apis/series';

const popularSeriesListInit = [
  {
    isLiked: false,
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
    isLiked: false,
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
    isLiked: false,
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
    popularSeriesResponse.data
      ? setPopularSeriesList(popularSeriesResponse.data.seriesList)
      : setPopularSeriesList('');

    const recentSeriesResponse = await getRecentSeries();
    recentSeriesResponse.data
      ? setRecentSeriesList(recentSeriesResponse.data.seriesList)
      : setRecentSeriesList('');

    const popularWritersResponse = await getPopularWriters();
    popularWritersResponse.data
      ? setPopularWriterList(popularWritersResponse.data.popularWriterList)
      : setPopularWriterList('');

    if (hasAuth) {
      const purChaseSeriesResponse = await getMyPurchaseSeries();
      purChaseSeriesResponse.data
        ? setPurChaseSeriesList(purChaseSeriesResponse.data.seriesList)
        : setPurChaseSeriesList('');
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
            <UserList list={popularWriterList} title="인기 작가" />
            {hasAuth && purChaseSeriesList.length > 0 ? (
              <SectionContainer title="구독중인 시리즈">
                <CardList list={purChaseSeriesList} />
              </SectionContainer>
            ) : (
              ''
            )}
            <SectionContainer title="최신 시리즈">
              <CardList list={recentSeriesList} />
            </SectionContainer>
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
