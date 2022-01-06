import React from 'react';
import { Wrapper, CardList, AddButton, Loading } from '@components';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
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
            <Link to="/series/write">
              <AddButton>시리즈 작성하기</AddButton>
            </Link>
          </Header>
          {values.length ? (
            <CardList list={values} />
          ) : (
            <p>데이터가 존재하지 않습니다.</p>
          )}
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
