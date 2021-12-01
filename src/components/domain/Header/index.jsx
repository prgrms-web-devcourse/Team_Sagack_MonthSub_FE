import React from 'react';
import styled from '@emotion/styled';
// import Icon from '@material-ui/core/Icon';
import Input from '../../commons/Input';
import Nav from './Nav';
import Logo from './Logo';

const Header = () => (
  <StyledHeader>
    <Logo />
    <Nav items={['Home', '연재하기', '내 채널']} />
    <SearchBox>
      <Input name="search" />
      <button type="button">검색 아이콘</button>
    </SearchBox>
    <Utils>
      <button type="button">글쓰기 버튼</button>
      <button type="button">사람 아이콘</button>
      {/* <a href="/">로그인</a> */}
    </Utils>
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SearchBox = styled.div``;

const Utils = styled.div``;
