import React from 'react';
import { Icon } from '@atom';

export default {
  title: 'Component/atom/Icon',
  component: Icon,
};

export const Like = () => (
  <Icon>
    <Icon.Like />
  </Icon>
);

export const Home = () => (
  <Icon>
    <Icon.Home />
  </Icon>
);

export const User = () => (
  <Icon>
    <Icon.User />
  </Icon>
);
