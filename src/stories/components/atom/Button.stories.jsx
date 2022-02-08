import React from 'react';
import { Button } from '@atom';

export default {
  title: 'Component/atom/Button',
  component: Button,
  argTypes: {
    width: { control: { type: 'number' } },
    height: { control: { type: 'number' } },
    children: { control: { type: 'none' } },
  },
};

export const Default = args => <Button {...args}>Button</Button>;
