import React from 'react';
import { Flex } from '@templates';
import { Button } from '@atom';

export default {
  title: 'Component/templates/Flex',
  component: Flex,
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
  <Flex {...args}>
    <Button />
    <Button />
    <Button />
  </Flex>
);
