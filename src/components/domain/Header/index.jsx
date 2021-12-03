import React from 'react';
import styled from '@emotion/styled';
import { useToggle } from '@hooks';
import { BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../../commons/Input';
import Nav from './Nav';
import Logo from './Logo';
import UserModal from './UserModal';

const logo = require('./logo.svg');

const Header = ({ children }) => {
  const [state, toggle] = useToggle();
  const handleClick = () => {
    // apis/auth/signout api 호출해야합니다.
    console.log('signout!');
  };
  return (
    <BrowserRouter>
      <StyledHeader>
        <Logo src={logo.default} alt="미리보기" />
        <Nav items={['Home', '연재하기', '내 채널']} />
        <SearchBox>
          <Input name="search" />
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
`;

const StyledUserModal = styled(UserModal)`
  position: absolute;
  top: 20px;
  right: 0;
`;

const SearchBox = styled.div``;

const Utils = styled.div``;
