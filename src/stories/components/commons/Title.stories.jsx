import React from 'react';
import { Title } from '@components';

export default {
  title: 'Component/commons/Title',
  component: Title,
  argTypes: {
    h2: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    h3: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    h4: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    h5: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    h6: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    size: {
      defaultValue: 'auto',
      control: { type: 'number' },
    },
    weight: {
      defaultValue: 700,
      control: { type: 'number' },
    },
  },
};

export const Default = args => <Title {...args}>제목</Title>;
