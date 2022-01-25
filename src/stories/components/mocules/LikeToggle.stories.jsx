import React from 'react';
import { LikeToggle } from '@mocules';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Component/mocules/LikeToggle',
  component: LikeToggle,
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export const Default = args => (
  <LikeToggle onclick={action('click')} {...args} />
);
