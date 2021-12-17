import React, { useEffect, useState } from 'react';
import { Wrapper, CardList } from '@components';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { getMyWriteSeries } from '@apis/user';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import theme from '@styles/theme';

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
        <Span>
          <H1>연재중인 시리즈</H1>
          <StyeldAddCircleOutlineIcon />
          <Link to="/series/write">새 시리즈 작성하기</Link>
        </Span>
        <CardList list={values} />
      </Container>
    </Wrapper>
  );
};
export default WriteListPage;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-right: ${theme.font.base};
`;

const Container = styled.div`
  width: 100%;
  margin-top: 5rem;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.font.base};
`;

const StyeldAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  color: ${theme.color.greyDark};
`;
