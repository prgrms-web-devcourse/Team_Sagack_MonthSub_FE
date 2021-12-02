import React from 'react';
import styled from '@emotion/styled';
import { useToggle } from '@hooks';
import { Button } from '@components';
import { useHistory } from 'react-router-dom';
import Input from '../../commons/Input';
import Nav from './Nav';
import Logo from './Logo';
import UserModal from './UserModal';

const Header = () => {
  const history = useHistory();
  const [state, toggle] = useToggle();
  // const handleClickSearch = () => {
  //   console.log('검색페이지로 넘어감');
  // };
  return (
    <StyledHeader>
      <Logo />
      <Nav items={['Home', '연재하기', '내 채널']} />
      <SearchBox>
        <Input name="search" />
        <span type="button" onClick={history.push('/search')}>
          검색 아이콘
        </span>
      </SearchBox>
      <Utils>
        <Button type="button">글쓰기 버튼</Button>
        <span type="button" onClick={toggle}>
          사람 아이콘
        </span>
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
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledUserModal = styled(UserModal)`
  position: absolute;
  top: 20px;
  right: 0;
`;

const SearchBox = styled.div``;

const Utils = styled.div``;
