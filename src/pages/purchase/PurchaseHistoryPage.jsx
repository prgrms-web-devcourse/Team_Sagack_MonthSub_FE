import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Wrapper, CardList, AddButton, Loading, NoData } from '@components';
import { Link, useHistory } from 'react-router-dom';
import { getMyPurchaseSeries } from '@apis/user';

const initialValues = {
  seriesList: [
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

const PurchaseHistoryPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(initialValues);

  const getInitialData = async () => {
    const { data } = await getMyPurchaseSeries();

    if (!data) {
      history.push('/server-error');
      return;
    }

    setValues(data);
    setLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Header>
            <H1>구독중인 시리즈</H1>
            <Link to="/series">
              <AddButton>시리즈 구독하기</AddButton>
            </Link>
          </Header>
          {values.seriesList.length ? (
            <CardList list={values.seriesList} />
          ) : (
            <NoData />
          )}
        </Container>
      )}
    </Wrapper>
  );
};

export default PurchaseHistoryPage;

const Container = styled.div`
  width: 100%;
  margin-top: 5rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-right: 2rem;
`;
