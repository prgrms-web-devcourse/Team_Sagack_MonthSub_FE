import React, { useEffect, useState } from 'react';
import { Wrapper, CardList, AddButton } from '@components';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { getMyWriteSeries } from '@apis/user';

const initialValues = [
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
];

const WriteListPage = () => {
  const [values, setValues] = useState(initialValues);
  const getInitialData = async () => {
    const { data } = await getMyWriteSeries();
    setValues(data.seriesList);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header>
          <H1>연재중인 시리즈</H1>
          <Link to="/series/write">
            <AddButton>시리즈 구독하기</AddButton>
          </Link>
        </Header>
        <CardList list={values} />
      </Container>
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
