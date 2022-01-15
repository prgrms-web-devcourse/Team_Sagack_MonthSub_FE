import { css } from '@emotion/react';

const fullScreen = css`
  position: relative;
  top: -3rem;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
`;

const invisibleScrollBar = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const mixin = { fullScreen, invisibleScrollBar };

export default mixin;
