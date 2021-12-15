import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getPurchaseInfo } from '@apis/purchase';
import { useHistory, useParams } from 'react-router-dom';
import { Wrapper, Image, Button, Container } from '@components';

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
      <Container title="결제">
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
        <ButtonContainer>
          <Button
            type="submit"
            width="48%"
            onClick={() => {
              history.push('/series');
            }}
          >
            시리즈 더 보기
          </Button>
          <Button
            type="submit"
            width="48%"
            onClick={() => {
              history.push(`/series/${id}`);
            }}
          >
            아티클 보기
          </Button>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

export default PurchaseResultPage;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
