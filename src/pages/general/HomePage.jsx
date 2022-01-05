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

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});
  const hasAuth = sessionStorage.getItem('authorization');

  const getInitialData = async () => {
    const popularSeriesResponse = await getPopularSeries();
    popularSeriesResponse.data
      ? setValues(prev => ({
          ...prev,
          popularSeriesList: popularSeriesResponse.data.seriesList,
        }))
      : setValues(values);

    const recentSeriesResponse = await getRecentSeries();
    recentSeriesResponse.data
      ? setValues(prev => ({
          ...prev,
          recentSeriesList: recentSeriesResponse.data.seriesList,
        }))
      : setValues(values);

    const popularWritersResponse = await getPopularWriters();
    popularWritersResponse.data
      ? setValues(prev => ({
          ...prev,
          popularWriterList: popularWritersResponse.data.popularWriterList,
        }))
      : setValues(values);

    if (hasAuth) {
      const purChaseSeriesResponse = await getMyPurchaseSeries();
      purChaseSeriesResponse.data
        ? setValues(prev => ({
            ...prev,
            purChaseSeriesList: purChaseSeriesResponse.data.seriesList,
          }))
        : setValues(values);
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
            list={values.popularSeriesList}
            parentOf="main"
            itemsCountOnRow={5}
            itemsCountOnCol={1}
          />
          <Wrapper className="customWrapper">
            <StyledUserList list={values.popularWriterList} title="인기 작가" />
            {hasAuth && values.purChaseSeriesList.length > 0 ? (
              <div>
                <SectionTitle>
                  <div>구독중인 시리즈</div>
                </SectionTitle>
                <RecentSeriesContainer>
                  <CardList list={values.purChaseSeriesList} />
                </RecentSeriesContainer>
              </div>
            ) : (
              ''
            )}
            <SectionTitle>
              <div>최신 시리즈</div>
            </SectionTitle>
            <RecentSeriesContainer>
              <CardList list={values.recentSeriesList} />
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
