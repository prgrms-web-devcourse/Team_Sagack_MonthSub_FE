import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import MenuIcon from '@material-ui/icons/Menu';
import { IconWrapper, Icon } from '@atom';
import { Flex } from '@templates';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useClickAway } from '@hooks';
import { lighten } from 'polished';
import Logo from './Logo';

const logo = require('@images/logo_whiteBackboard.svg');

const ResponsiveHeader = ({ userId }) => {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useClickAway(() => {
    setIsOpened(false);
  });

  const handleMenuClick = () => {
    setIsOpened(prev => !prev);
  };

  const handleBackgroundClick = e => {
    if (e.target !== e.currentTarget) return;
    setIsOpened(false);
  };

  return (
    <Header>
      <Logo src={logo.default} alt="미리보기" />
      <IconWrapper fontSize="2rem">
        <StyledMenuIcon onClick={handleMenuClick} />
      </IconWrapper>
      {isOpened && (
        <NavContainer ref={ref} onClick={handleBackgroundClick}>
          <StyledFlex width="100%" justifyContent="center">
            <Link to="/search" islogin={userId} onClick={handleMenuClick}>
              <SearchBox>
                <StyledSearchIcon />
              </SearchBox>
            </Link>
            <li>
              <Link to="/" onClick={handleMenuClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/series" onClick={handleMenuClick}>
                구독 모집
              </Link>
            </li>
            <li>
              <Link to="/channel/my" onClick={handleMenuClick}>
                내 채널
              </Link>
            </li>
            {userId ? (
              <>
                <li>
                  <Link to="/my/info" onClick={handleMenuClick}>
                    내 정보
                  </Link>
                </li>
                <li>
                  <Link to="/writes" onClick={handleMenuClick}>
                    글쓰기
                  </Link>
                </li>
              </>
            ) : (
              <LoginLi>
                <Link to="/signin" onClick={handleMenuClick}>
                  로그인
                </Link>
              </LoginLi>
            )}
          </StyledFlex>
        </NavContainer>
      )}
    </Header>
  );
};

ResponsiveHeader.defaultProps = {
  userId: 0,
};

ResponsiveHeader.propTypes = {
  userId: PropTypes.number,
};

export default ResponsiveHeader;

const Header = styled.header`
  position: fixed;
  padding: 0 3rem;
  top: 0;
  width: 100%;
  display: flex;
  height: ${theme.common.navHeight};
  align-items: center;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 0.05rem 0.1rem 0 rgba(50, 50, 93, 0.15);

  justify-content: center;

  @media ${theme.device.laptop} {
    display: none;
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  font-size: 4rem;
  position: absolute;
  top: 35%;
  left: 0.5rem;
  z-index: 2;
  cursor: pointer;
`;

const StyledFlex = styled(Flex)`
  position: absolute;
  background-color: #fff;
  padding: 2rem 0;
  height: 15rem;
  animation: fadeIn 1s;
  li {
    margin-top: 1rem;

    &:hover {
      color: ${theme.color.main};
      transition: all 200ms ease-out;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NavContainer = styled.div`
  position: fixed;
  top: ${theme.common.navHeight};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledSearchIcon = styled(Icon.Search)`
  margin-right: 0.3rem;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 20rem;
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

const LoginLi = styled.li`
  padding-top: 1.5rem;
`;
