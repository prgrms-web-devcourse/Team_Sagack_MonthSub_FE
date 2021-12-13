import React from 'react';
import styled from '@emotion/styled';
import { useSessionStorage } from '@hooks';
import { BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icons } from '@components';
import { lighten } from 'polished';
import Nav from './Nav';
import Logo from './Logo';
import theme from '../../../styles/theme';

const logo = require('./logo.svg');

const Header = ({ children }) => {
  const { storedValue } = useSessionStorage('authorization', '');

  // const handleClick = () => {
  //   removeValue('authorization');

  return (
    <BrowserRouter>
      <StyledHeader>
        <Logo src={logo.default} alt="미리보기" />
        <Nav items={['Home', '연재하기', '내 채널']} />
        <Utils>
          <Link to="/search">
            <SearchBox>
              <StyledSearchIcon />
            </SearchBox>
          </Link>
          <Link to="/writes">
            <Button width="6rem" circle>
              글쓰기
            </Button>
          </Link>
          <Link to="/my/info">
            <Icons.User style={{ display: storedValue ? 'inline' : 'none' }} />
          </Link>
          <Link
            to="/signin"
            style={{ display: storedValue ? 'none' : 'inline' }}
          >
            로그인
          </Link>
        </Utils>
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
  margin-right: 5rem;
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
  align-items: center;
`;
