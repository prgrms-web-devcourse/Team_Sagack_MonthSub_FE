import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Button, Icons } from '@components';
import theme from '@styles/theme';
import { lighten } from 'polished';
import { useUser } from '@contexts/UserProvider';
import { css } from '@emotion/react';
import Nav from './Nav';
import Logo from './Logo';

const logo = require('./logo_whiteBackboard.svg');

const Header = () => {
  const { userInfo } = useUser();

  return (
    <StyledHeader>
      <Logo src={logo.default} alt="미리보기" />
      <StyledNav items={['Home', '연재하기', '내 채널']} />
      <Utils islogin={userInfo.username}>
        <SearchLink to="/search" islogin={userInfo.username}>
          <SearchBox>
            <StyledSearchIcon />
          </SearchBox>
        </SearchLink>
        {userInfo.username ? (
          <>
            <Link to="/writes">
              <StyledButton width="6rem" circle>
                글쓰기
              </StyledButton>
            </Link>
            <Link to="/my/info">
              <Icons.User />
            </Link>
          </>
        ) : (
          <LoginLink to="/signin">로그인</LoginLink>
        )}
      </Utils>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${theme.common.navHeight};
  padding: 0 3rem;
  top: 0;
  background-color: #fff;
  box-shadow: 0 0.05rem 0.1rem 0 rgba(50, 50, 93, 0.15);
  z-index: 2;
  a:hover {
    color: ${theme.color.main};
    transition: all 200ms ease-out;
  }
`;

const StyledNav = styled(Nav)`
  width: 100%;
  min-width: 15rem;
  margin: 0 4rem;
`;

const StyledSearchIcon = styled(Icons.Search)`
  margin-right: 0.3rem;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 10rem;
  padding: 0.2rem;
  border-radius: 4px;
  background-color: ${theme.color.greyLight};
  &:hover {
    outline: 0.0625rem solid ${theme.color.main};
    background-color: ${lighten(0.01, theme.color.greyLight)};
    ${StyledSearchIcon} {
      color: ${theme.color.main};
    }
  }
`;

const Utils = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 17rem;
  ${({ islogin }) =>
    islogin &&
    css`
      max-width: 23rem;
    `}
`;

const SearchLink = styled(Link)`
  margin-right: 1.5rem;
  ${({ islogin }) =>
    islogin &&
    css`
      margin-right: 2.5rem;
    `}
`;

const StyledButton = styled(Button)`
  margin-right: 1rem;
`;

const LoginLink = styled(Link)`
  flex-shrink: 0;
`;
