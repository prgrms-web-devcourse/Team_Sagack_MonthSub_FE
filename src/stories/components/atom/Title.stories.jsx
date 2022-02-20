import React from 'react';
import { Title } from '@atom';

export default {
  title: 'Component/atom/Title',
  component: Title,
  argTypes: {
    children: {
      defaultValue: 'Title',
      control: { type: 'text' },
    },
    size: {
      options: ['small', 'base', 'medium', 'large', 'xLarge'],
      control: { type: 'radio' },
    },
    color: {
      control: { type: 'color' },
    },
    weight: {
      options: [400, 500, 700],
      control: { type: 'radio' },
    },
    marginBottom: {
      control: { type: 'none' },
    },
    extraItem: {
      control: { type: 'none' },
    },
  },
};

export const Default = args => <Title {...args} />;
