import React from 'react';
import { Input } from '@atom';

export default {
  title: 'Component/atom/Input',
  component: Input,
  argTypes: {
    name: {
      defaultValue: '',
      control: 'string',
    },
    width: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    height: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    type: {
      options: ['text', 'password', 'date'],
      control: { type: 'inline-radio' },
    },
  },
};

export const Default = args => <Input {...args} />;
