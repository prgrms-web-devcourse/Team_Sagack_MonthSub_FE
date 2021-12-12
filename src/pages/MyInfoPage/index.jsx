import React from 'react';
import styled from '@emotion/styled';
import { Wrapper } from '@components';
import { Link } from 'react-router-dom';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

const MyInfoPage = () => (
  <Wrapper>
    <Container>
      <StyledLink to="/my/edit">
        <StyledChromeReaderModeIcon />
      </StyledLink>
      <StyledLink to="/purchase-info">
        <LocalAtmIcon />
      </StyledLink>
    </Container>
  </Wrapper>
);

export default MyInfoPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  width: 40%;
  height: 30%;
  background-color: #ffffff;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: 0.3rem #041b2d solid;
`;

const StyledChromeReaderModeIcon = styled(ChromeReaderModeIcon)`
  width: 20rem;
  height: 20rem;
`;
