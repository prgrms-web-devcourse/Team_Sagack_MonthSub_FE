import React from 'react';
import { Icon } from '@atom';

export default {
  title: 'Component/atom/Icon',
  component: Icon,
};

export const Like = args => (
  <Icon {...args}>
    <Icon.Like />
  </Icon>
);

export const LikeBorder = args => (
  <Icon {...args}>
    <Icon.LikeBorder />
  </Icon>
);

export const Home = args => (
  <Icon {...args}>
    <Icon.Home />
  </Icon>
);

export const User = args => (
  <Icon {...args}>
    <Icon.User />
  </Icon>
);

export const Change = args => (
  <Icon {...args}>
    <Icon.Change />
  </Icon>
);

export const Search = args => (
  <Icon {...args}>
    <Icon.Search />
  </Icon>
);

export const Tag = args => (
  <Icon {...args}>
    <Icon.Tag />
  </Icon>
);

export const AddCircle = args => (
  <Icon {...args}>
    <Icon.AddCircle />
  </Icon>
);

export const Info = args => (
  <Icon {...args}>
    <Icon.Info />
  </Icon>
);
