import React from 'react';
import styled from '@emotion/styled';
import { Wrapper, Container, Button } from '@components';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '@contexts/UserProvider';

const MyInfoPage = () => {
  const history = useHistory();
  const { removeToken } = useUser();

  const handleClick = () => {
    sessionStorage.removeItem('authorization');
    removeToken();
    history.push('/');
  };

  return (
    <Wrapper center>
      <Container title="마이 페이지">
        <StyledLink to="/my/edit">내 정보 수정</StyledLink>
        <StyledLink to="/purchase/info">내 구독 내역</StyledLink>
        <StyledLink to="/my/likes">내 관심 목록</StyledLink>
        <StyledButton type="button" onClick={handleClick}>
          로그아웃
        </StyledButton>
      </Container>
    </Wrapper>
  );
};

export default MyInfoPage;

const StyledLink = styled(Link)`
  width: 100%;
  height: 1rem;
  background-color: #ffffff;
  margin: 2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.25rem -0.25rem #f5f5f5;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 3rem;
`;
