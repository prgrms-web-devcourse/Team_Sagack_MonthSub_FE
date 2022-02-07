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
      control: { type: 'range', min: 100, max: 500 },
    },
    height: {
      defaultValue: 30,
      control: { type: 'range', min: 10, max: 100 },
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
