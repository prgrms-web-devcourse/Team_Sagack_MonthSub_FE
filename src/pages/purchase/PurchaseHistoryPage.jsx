import React from 'react';
import styled from '@emotion/styled';
import { Loading } from '@atom';
import { CardList } from '@organisms';
import { Wrapper } from '@templates';

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
          </Header>
          <CardList list={values.seriesList} />
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
