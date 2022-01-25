import React from 'react';
import { TextArea } from '@atom';

export default {
  title: 'Component/atom/TextArea',
  component: TextArea,
  argTypes: {
    width: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    height: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
  },
};

export const Default = args => <TextArea {...args} />;
