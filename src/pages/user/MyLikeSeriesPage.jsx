import React, { useState, useEffect } from 'react';
import { Wrapper, CardList, Loading } from '@components';
import { getMyLikes } from '@apis/user';
import styled from '@emotion/styled';

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

const MyLikeSeriesPage = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(initialValues);

  const getInitialData = async () => {
    const { data } = await getMyLikes();

    if (data) {
      setValues(data.seriesList);
    }
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
            <H1>관심 시리즈</H1>
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
export default MyLikeSeriesPage;

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
