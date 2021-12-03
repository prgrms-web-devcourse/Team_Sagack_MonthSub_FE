import React from 'react';
import { List, Button } from '@components';

export default {
  title: 'Component/commons/List',
  component: List,
  argTypes: {
    width: {
      control: { type: 'range', min: 200, max: 600 },
    },
    height: {
      control: { type: 'range', min: 200, max: 600 },
    },
    color: { control: { type: 'color' } },
    fontSize: { control: { type: 'number' } },
    horizen: { control: 'bool' },
    justifyContent: { control: 'string' },
    alignItems: { control: 'string' },
  },
};

export const Default = args => (
  <List {...args}>
    <Button />
    <Button />
    <Button />
  </List>
);
