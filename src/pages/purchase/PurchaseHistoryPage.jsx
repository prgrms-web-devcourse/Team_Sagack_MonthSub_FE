import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Wrapper, CardList } from '@components';
import { getMyPurchaseSeries } from '@apis/user';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import theme from '@styles/theme';

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
  const [values, setValues] = useState(initialValues);

  const getInitialData = async () => {
    const { data } = await getMyPurchaseSeries();
    setValues(data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Span>
          <H1>구독중인 시리즈</H1>
          <StyeldAddCircleOutlineIcon />
          <Link to="/series">시리즈 구독하기</Link>
        </Span>
        {values.seriesList.length ? (
          <CardList list={values.seriesList} />
        ) : (
          <div>구독한 시리즈가 없습니다.</div>
        )}
      </Container>
    </Wrapper>
  );
};

export default PurchaseHistoryPage;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-right: 1rem;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 5rem;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyeldAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  color: ${theme.color.greyDark};
`;
