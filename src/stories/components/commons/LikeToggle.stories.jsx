import React from 'react';
import LikeToggle from '@components/commons/LikeToggle';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Component/LikeToggle',
  component: LikeToggle,
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export const Default = args => (
  <LikeToggle onclick={action('click')} {...args} />
);
