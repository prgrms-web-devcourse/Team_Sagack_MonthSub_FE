import React from 'react';
import { DropListSelect } from '@molecules';

export default {
  title: 'Component/molecules/DropListSelect',
  component: DropListSelect,
};

export const Default = args => (
  <DropListSelect options={['option1', 'option2', 'option3']} {...args} />
);
