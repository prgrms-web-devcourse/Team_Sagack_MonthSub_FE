import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@atom';
import { Wrapper, Container } from '@templates';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '@contexts/UserProvider';
import theme from '@styles/theme';

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
      <StyledContainer title="마이 페이지">
        <LinkList>
          <StyledLink to="/my/edit">내 정보 수정</StyledLink>
          <StyledLink to="/purchase/info">내 구독 내역</StyledLink>
          <StyledLink to="/my/likes">내 관심 목록</StyledLink>
        </LinkList>
        <StyledButton type="button" onClick={handleClick}>
          로그아웃
        </StyledButton>
      </StyledContainer>
    </Wrapper>
  );
};

export default MyInfoPage;

const StyledContainer = styled(Container)`
  @media ${theme.device.tablet} {
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const LinkList = styled.div`
  @media ${theme.device.tablet} {
    flex-grow: 1;
    align-self: flex-start;
    margin-top: 0;
  }
  @media ${theme.device.mobile} {
    margin-top: 0;
  }
`;

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
  @media ${theme.device.tablet} {
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 3rem;
  @media ${theme.device.tablet} {
    margin-top: 1rem;
  }
`;
