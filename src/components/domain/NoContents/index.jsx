import React from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { Link } from 'react-router-dom';
import { Icons, IconWrapper } from '@components';

const NoContents = () => (
  <StyledContainer>
    <StyledDiv>
      <InnerGrid>
        <div className="edgeItems" />
        <div className="edgeItems" />
        <div className="edgeItems" />
        <div className="edgeItems" />
        <TextBox>
          <IconWrapper color="#000000" fontSize="10rem">
            <Icons.Info />
          </IconWrapper>
          <div>
            <div>THERE ARE NO CONTENTS</div>
            <div>컨텐츠가 존재하지 않습니다.</div>
            <div>
              <Link to="/">&lt; 메인으로 돌아가기</Link>
            </div>
          </div>
        </TextBox>
      </InnerGrid>
    </StyledDiv>
  </StyledContainer>
);

export default NoContents;

const StyledContainer = styled.div`
  padding-top: 5rem;
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 600px;
  background-color: ${theme.color.main};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${theme.style.boxShadow};
`;

const InnerGrid = styled.div`
  position: relative;
  width: 80%;
  height: 66%;
  display: flex;
  justify-content: center;
  align-items: center;

  > .edgeItems {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 1.25rem solid #000000;
  }

  > .edgeItems:nth-of-type(1) {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }

  > .edgeItems:nth-of-type(2) {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
  }

  > .edgeItems:nth-of-type(3) {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
  }

  > .edgeItems:nth-of-type(4) {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div:nth-of-type(2) {
    font-size: 3rem;
  }
`;
