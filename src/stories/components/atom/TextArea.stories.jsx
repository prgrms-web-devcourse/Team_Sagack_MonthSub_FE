import React from 'react';
import { TextArea } from '@atom';

export default {
  title: 'Component/atom/TextArea',
  component: TextArea,
  argTypes: {
    width: {
      defaultValue: 20,
      control: { type: 'range', min: 10, max: 50 },
    },
    height: {
      defaultValue: 20,
      control: { type: 'range', min: 10, max: 50 },
    },
  },
};

export const Default = args => <TextArea {...args} />;
