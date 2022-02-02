import React from 'react';
import { Like } from '@mocules';

export default {
  title: 'Component/mocules/Like',
  component: Like,
  argTypes: {
    isLogin: { defaultValue: true, control: 'boolean' },
    isLiked: { defaultValue: false, control: 'none' },
    initialCount: { defaultValue: 0, control: 'number' },
  },
};

export const Default = args => <Like {...args} />;
