import React from 'react';
import { Wrapper } from '@components';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import theme from '@styles/theme';

const WriteListPage = () => (
  <Wrapper>
    <Container>
      <Span>
        <H1>연재중인 시리즈</H1>
        <StyeldAddCircleOutlineIcon />
        <Link to="/series/write">새 시리즈 작성하기</Link>
      </Span>
    </Container>
  </Wrapper>
);
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
