import React from 'react';
import { Loading } from '@atom';
import { ContentAddLink } from '@molecules';
import { CardList } from '@organisms';
import { Wrapper } from '@templates';
import styled from '@emotion/styled';

import { getMyWriteSeries } from '@apis/user';
import { useFetch } from '@hooks';

const WriteListPage = () => {
  const { values, isLoading } = useFetch({
    initialValues: {},
    apiName: getMyWriteSeries,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Header>
            <H1>연재중인 시리즈</H1>
            <ContentAddLink url="/series/write">시리즈 작성하기</ContentAddLink>
          </Header>
          <CardList list={values} />
        </Container>
      )}
    </Wrapper>
  );
};
export default WriteListPage;

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
