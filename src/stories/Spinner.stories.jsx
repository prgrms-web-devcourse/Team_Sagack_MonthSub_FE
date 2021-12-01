import React from 'react';
import Spinner from '@components/commons/Spinner';

export default {
  title: 'Component/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      defaultValue: '24',
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
};

export const Default = args => <Spinner {...args} />;
