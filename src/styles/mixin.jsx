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

const invisibleScrollBar = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const header = css`
  position: fixed;
  display: flex;
  padding: 0 3rem;
  top: 0;
  height: ${theme.common.navHeight};
  width: 100%;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0.05rem 0.1rem 0 rgba(50, 50, 93, 0.15);
`;

const mixin = { header, fullScreen, invisibleScrollBar };

export default mixin;
