import { css } from '@emotion/react';

const fullScreen = css`
  position: relative;
  top: -3rem;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
`;

const mixin = { fullScreen };

export default mixin;
