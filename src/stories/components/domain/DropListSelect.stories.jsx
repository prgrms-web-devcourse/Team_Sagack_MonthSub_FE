import React from 'react';
import { DropListSelect } from '@components';

export default {
  title: 'Component/domain/DropListSelect',
  component: DropListSelect,
};

export const Default = args => (
  <DropListSelect options={['option1', 'option2', 'option3']} {...args} />
);
