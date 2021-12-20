import React, { useState, useEffect } from 'react';
import { Wrapper, CardList } from '@components';
import { getMyLikes } from '@apis/user';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

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
  const [values, setValues] = useState(initialValues);
  const history = useHistory();

  const getInitialData = async () => {
    const { data } = await getMyLikes();

    if (!data) {
      history.push('/server-error');
      return;
    }

    setValues(data.seriesList);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header>
          <H1>관심 시리즈</H1>
        </Header>
        {values.length ? (
          <CardList list={values} />
        ) : (
          <div>구독한 시리즈가 없습니다.</div>
        )}
      </Container>
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
