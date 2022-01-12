import { css } from '@emotion/react';
import theme from './theme';

const fullScreen = css`
  position: relative;
  top: -3rem;
  width: 100vw;
  height: 30rem;
  margin-left: calc(-50vw + 50%);
  @media ${theme.device.tablet} {
    height: 43vw;
  }
  @media ${theme.device.mobile} {
    height: 43vw;
  }
`;

const mixin = { fullScreen };

export default mixin;
