import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getPurchaseInfo } from '@apis/purchase';
import { useHistory, useParams } from 'react-router-dom';
import { Wrapper, Image, Button } from '@components';

const DEFAULT_PROFILE_IMAGE =
  'https://monthsub-image.s3.ap-northeast-2.amazonaws.com/users/default/monthsub_default_profile.jpg';

const initialData = {
  series: {
    email: '',
    title: '',
    thumbnail: '',
    category: '',
    price: 0,
    articleCount: 0,
    startDate: '',
    endDate: '',
    date: [],
    time: '',
  },
};

const PurchaseResultPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [values, setValues] = useState(initialData);

  const getInitialData = async () => {
    const { data } = await getPurchaseInfo({ id });
    setValues(data);
  };

  useEffect(() => {
    getInitialData();
  }, []);
  return (
    <Wrapper>
      <Container>
        <H1>결제</H1>
        <PurchaseResult>
          결제를 완료했습니다!
          <p>남은 포인트</p>
        </PurchaseResult>
        <PurchaseSeries>
          <Image
            alt="시리즈썸네일"
            width="20%"
            height="20%"
            src={values.series.thumbnail || DEFAULT_PROFILE_IMAGE}
          />
          <Content>
            <H2>{values.series.title}</H2>
            <span>{values.series.nickname}</span>
            <span>{values.series.category}</span>
            <span>{values.series.price}</span>
          </Content>
        </PurchaseSeries>
        <Button
          type="submit"
          width="100%"
          onClick={() => {
            history.push('/');
          }}
        >
          홈으로 가기
        </Button>
      </Container>
    </Wrapper>
  );
};

export default PurchaseResultPage;

const Container = styled.div`
  width: 80%;
  height: 50%;
  margin: 15rem auto;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
`;

const H1 = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 0.25rem 0.25rem -0.25rem #c4c4c4;
  padding: 0.5rem 0;
`;

const H2 = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
`;

const PurchaseSeries = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Content = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`;

const PurchaseResult = styled.div`
  padding: 2rem 1rem;
  text-align: center;
`;
