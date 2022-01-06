import React from 'react';
import styled from '@emotion/styled';
import { Wrapper, CardList, AddButton, Loading } from '@components';
import { Link } from 'react-router-dom';
import { getMyPurchaseSeries } from '@apis/user';
import { useFetch } from '@hooks';

const PurchaseHistoryPage = () => {
  const { values, isLoading } = useFetch({
    initialValues: {},
    apiName: getMyPurchaseSeries,
  });

  return (
    <Wrapper>
      {isLoading ? (
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
            <p>데이터가 존재하지 않습니다.</p>
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
