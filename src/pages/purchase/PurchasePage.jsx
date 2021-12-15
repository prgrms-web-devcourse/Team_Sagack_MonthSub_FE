import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Wrapper, Image, Button, Container } from '@components';
import { useHistory, useParams } from 'react-router-dom';
import { getPurchaseInfo } from '@apis/purchase';
import theme from '@styles/theme';

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

const PurchasePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [values, setValues] = useState(initialData);

  const handleSubmit = e => {
    console.log(e);
    history.push(`/purchase/result/${id}`);
  };

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
        <PurchaseSeries>
          <Image
            alt="시리즈썸네일"
            width="30%"
            height="30%"
            src={values.series.thumbnail || DEFAULT_PROFILE_IMAGE}
          />
          <Content>
            <TitleContainer>
              <H2>{values.series.title}</H2>
              <span>{values.series.nickname}</span>
            </TitleContainer>
            <FlexContainer>
              <div>
                {values.series.startDate} ~ {values.series.endDate}
              </div>
              <div>회차 : {values.series.articleCount}</div>
            </FlexContainer>
            <FlexContainer>
              <span>{values.time}</span>
              <span>{values.series.date.join(',')}</span>
            </FlexContainer>
            <FlexContainer>
              <Label>{values.series.category}</Label>
              <Price>{values.series.price}</Price>
            </FlexContainer>
          </Content>
        </PurchaseSeries>
        <Button type="submit" width="100%" onClick={handleSubmit}>
          결제하기
        </Button>
      </Container>
    </Wrapper>
  );
};

export default PurchasePage;

const H1 = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 0.25rem 0.25rem -0.25rem #c4c4c4;
  padding: 0.5rem 0;
`;

const H2 = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
`;

const PurchaseSeries = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
`;

const Content = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const FlexContainer = styled.div`
  width: 100%;
`;

const Label = styled.div`
  width: 6rem;
  height: 2rem;
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 0.1rem ${theme.color.main} solid;
  color: ${theme.color.main};
`;

const Price = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0.5rem 0;
`;
