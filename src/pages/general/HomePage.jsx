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
import { useMediaQuery } from '@material-ui/core';
import { theme, standardValues } from '@styles';

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

  const isTablet = useMediaQuery(theme.detailedMobile.tablet);
  const isMobile = useMediaQuery(theme.detailedMobile.mobileL);
  const isMobileS = useMediaQuery(theme.detailedMobile.mobileS);
  const { maxCount } = standardValues.banner;

  return (
    <HomepageContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <CardSlider
            list={values.popularSeriesList}
            parentOf="main"
            itemsCountOnRow={
              isMobileS
                ? maxCount.mobS
                : isMobile
                ? maxCount.mobL
                : isTablet
                ? maxCount.tab
                : maxCount.top
            }
            itemsCountOnCol={1}
          />
          <Wrapper className="customWrapper">
            <UserList list={values.popularWriterList} title="인기 작가" />

            {hasAuth && values.purChaseSeriesList.length > 0 ? (
              <SectionContainer title="구독중인 시리즈">
                <CardList list={values.purChaseSeriesList} />
              </SectionContainer>
            ) : (
              ''
            )}
            <SectionContainer title="최신 시리즈">
              <CardList list={values.recentSeriesList} />
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
