import React, { useState, useEffect } from 'react';
import { Wrapper, Container, CardList } from '@components';
import { getMyLikes } from '@apis/user';

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
  const getInitialData = async () => {
    const { data } = await getMyLikes();
    setValues(data.seriesList);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
      <Container title="내 관심 시리즈">
        <CardList list={values} />
      </Container>
    </Wrapper>
  );
};
export default MyLikeSeriesPage;
