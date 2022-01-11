import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Wrapper, Image, Button, Container, Loading } from '@components';
import { useParams, useHistory } from 'react-router-dom';
import { getPurchaseInfo, postPurchase } from '@apis/purchase';
import theme from '@styles/theme';
import convertDay from '@utils/convertDay';
import convertCategory from '@utils/convertCategory';
import { useFetch } from '@hooks';

const PurchasePage = () => {
  const { id } = useParams();
  const { values, setValues, isLoading, setIsLoading } = useFetch({
    initialValues: {},
    apiName: getPurchaseInfo,
    id,
  });
  const history = useHistory();
  const [isPayed, setIsPayed] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await postPurchase({ id });

      if (!data) {
        history.goBack();
        return;
      }

      setValues(data);
      setIsPayed(true);
      setIsLoading(false);
    } catch (error) {
      history.goBack();
    }
  };

  return (
    <Wrapper center>
      {isLoading ? (
        <Loading />
      ) : (
        <Container title="결제">
          {isPayed && (
            <PurchaseResult>
              결제를 완료했습니다!
              <p>남은 포인트 : {values.user.point} 원</p>
            </PurchaseResult>
          )}
          <PurchaseSeries>
            <Image
              alt="시리즈썸네일"
              width="30%"
              height="30%"
              src={values.thumbnail}
            />
            <Content>
              <TitleContainer>
                <H2>{values.title}</H2>
                <span>저자 {values.nickname}</span>
              </TitleContainer>
              <FlexContainer>
                <div>
                  연재일: {values.startDate} ~ {values.endDate}
                </div>
                <div>회차 : {values.articleCount}</div>
              </FlexContainer>
              <FlexContainer>
                <span>{convertDay(values.date).join(', ')}</span>
                <span> {values.time}시</span>
              </FlexContainer>
              <FlexContainer>
                <div>카테고리: {convertCategory(values.category)}</div>
                <Price>{values.price} 원</Price>
              </FlexContainer>
            </Content>
          </PurchaseSeries>
          {isPayed ? (
            <ButtonContainer>
              <Button
                type="submit"
                width="48%"
                height="3rem"
                onClick={() => {
                  history.push('/series');
                }}
                margin={0}
              >
                시리즈더보기
              </Button>
              <Button
                type="submit"
                width="48%"
                height="3rem"
                onClick={() => {
                  history.push(`/series/${id}`);
                }}
                margin={0}
              >
                작품보기
              </Button>
            </ButtonContainer>
          ) : (
            <Button
              type="submit"
              width="100%"
              height="3rem"
              onClick={handleSubmit}
              margin={0}
            >
              결제하기
            </Button>
          )}
        </Container>
      )}
    </Wrapper>
  );
};

export default PurchasePage;

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
  margin-left: 1.25rem;

  div {
    margin-bottom: 1rem;
  }
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

const Price = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0.5rem 0;
`;

const PurchaseResult = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  background-color: ${theme.color.main};
  border-radius: 1.25rem;
  margin-top: 1rem;
  font-size: ${theme.font.medium};
  line-height: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
