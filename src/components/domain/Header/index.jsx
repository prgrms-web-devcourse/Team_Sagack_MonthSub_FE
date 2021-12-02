import React from 'react';
import styled from '@emotion/styled';
import { useToggle } from '@hooks';
import { Button } from '@components';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../../commons/Input';
import Nav from './Nav';
import Logo from './Logo';
import UserModal from './UserModal';

const Header = ({ children }) => {
  const [state, toggle] = useToggle();
  return (
    <BrowserRouter>
      <StyledHeader>
        <Logo />
        <Nav items={['Home', '연재하기', '내 채널']} />
        <SearchBox>
          <Input name="search" />
          <span type="button">검색 아이콘</span>
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
      {children}
    </BrowserRouter>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
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
