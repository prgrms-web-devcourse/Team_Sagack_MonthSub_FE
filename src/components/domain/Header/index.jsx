import React from 'react';
import styled from '@emotion/styled';
import { useToggle } from '@hooks';
import Input from '../../commons/Input';
import Nav from './Nav';
import Logo from './Logo';
import UserModal from './UserModal';

const Header = () => {
  const [state, toggle] = useToggle();
  return (
    <StyledHeader>
      <Logo />
      <Nav items={['Home', '연재하기', '내 채널']} />
      <SearchBox>
        <Input name="search" />
        <button type="button">검색 아이콘</button>
      </SearchBox>
      <Utils>
        <button type="button">글쓰기 버튼</button>
        <button type="button" onClick={toggle}>
          사람 아이콘
        </button>
        {/* <a href="/">로그인</a> */}
      </Utils>
      <StyledUserModal
        items={['마이페이지', '관심 시리즈', '로그아웃']}
        visible={state}
      />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledUserModal = styled(UserModal)`
  position: absolute;
  top: 20px;
  right: 0;
`;

const SearchBox = styled.div``;

const Utils = styled.div``;
