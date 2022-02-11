import React from 'react';
import { LikeToggle } from '@mocules';

export default {
  title: 'Component/mocules/LikeToggle',
  component: LikeToggle,
};

const Template = args => <LikeToggle {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLogin: true,
  isLiked: false,
  initialCount: 0,
};

export const IsLiked = Template.bind({});
IsLiked.args = {
  isLogin: true,
  isLiked: true,
  initialCount: 1,
};

export const NotLogin = Template.bind({});
NotLogin.args = {
  isLogin: false,
  isLiked: false,
  initialCount: 0,
};
