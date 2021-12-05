import React from 'react';
import styled from '@emotion/styled';
import { useToggle, useSessionStorage } from '@hooks';
import { BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input } from '@components';
import Nav from './Nav';
import Logo from './Logo';
import UserModal from './UserModal';

const logo = require('./logo.svg');

const Header = ({ children }) => {
  const [state, toggle] = useToggle();
  const { storedValue, removeValue } = useSessionStorage('authorization', '');

  const handleClick = () => {
    console.log(storedValue); // 현재 token 값
    // apis/auth/signout api 호출해야합니다.
    removeValue('authorization');
  };

  return (
    <BrowserRouter>
      <StyledHeader>
        <Logo src={logo.default} alt="미리보기" />
        <Nav items={['Home', '연재하기', '내 채널']} />
        <SearchBox>
          <Input name="search" value="" />
          <Link to="/search">
            <span type="button">검색 아이콘</span>
          </Link>
        </SearchBox>
        <Utils>
          <Link to="/writes">글쓰기 버튼</Link>
          <span type="button" onClick={toggle}>
            사람 아이콘
          </span>
          {/* <a href="/">로그인</a> */}
        </Utils>
        <StyledUserModal
          items={['마이페이지', '관심 시리즈', '로그아웃']}
          visible={state}
          onClick={handleClick}
          isSignIn={storedValue}
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
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 3rem;
  top: 0;
  background-color: white;
  border-bottom: 0.0625rem solid #ffb15c;
  z-index: 1;
`;

const StyledUserModal = styled(UserModal)`
  position: absolute;
  top: 1.25rem;
  right: 0;
`;

const SearchBox = styled.div``;

const Utils = styled.div``;
