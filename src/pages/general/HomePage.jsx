import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Wrapper, CardList, CardSlider, SectionTitle } from '@components';
import { getMain, getMyPurchaseSeries } from '@apis/user';

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
  seriesList: [
    {
      likeStatus: true,
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
  const hasAuth = sessionStorage.getItem('authorization');

  const getInitialData = async () => {
    const mainResponse = await getMain();
    setValues(mainResponse.data);

    if (hasAuth) {
      const purChaseSeriesResponse = await getMyPurchaseSeries();
      setValues({
        ...mainResponse.data,
        seriesList: purChaseSeriesResponse.data.seriesList,
      });
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <HomepageContainer>
      <CardSlider
        list={values.popularSeriesList}
        parentOf="main"
        itemsCountOnRow={5}
        itemsCountOnCol={1}
      />

      <Wrapper className="customWrapper">
        {hasAuth ? (
          <div>
            <SectionTitle>
              <div>구독중인 시리즈</div>
            </SectionTitle>
            <RecentSeriesContainer>
              <CardList list={values.seriesList} />
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
