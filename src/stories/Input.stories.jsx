import React from 'react';
import Input from '@components/commons/Input';

export default {
  title: 'Component/Input',
  component: Input,
  argTypes: {
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