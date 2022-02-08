import React from 'react';
import { Input } from '@atom';

export default {
  title: 'Component/atom/Input',
  component: Input,
  argTypes: {
    width: {
      defaultValue: 15,
      control: { type: 'range', min: 10, max: 50 },
    },
    height: {
      defaultValue: 2,
      control: { type: 'range', min: 1, max: 50 },
    },
    type: {
      options: ['text', 'password', 'date'],
      control: { type: 'inline-radio' },
    },
    placeholder: {
      defaultValue: '값을 입력해주세요',
      control: { type: 'text' },
    },
  },
};

export const Default = args => <Input {...args} />;
