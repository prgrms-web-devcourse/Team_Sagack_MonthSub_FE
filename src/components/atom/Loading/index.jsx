import React from 'react';
import styled from '@emotion/styled';
import Loader from 'react-loader-spinner';
import theme from '@styles/theme';

const Loading = () => (
  <Wrapper>
    <Loader
      type="Oval"
      color={theme.color.main}
      width={100}
      height={100}
      timeout={3000}
    />
  </Wrapper>
);

export default Loading;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
