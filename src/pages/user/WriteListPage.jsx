import React from 'react';
import { Wrapper } from '@components';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  color: #4b4b4b;
`;
