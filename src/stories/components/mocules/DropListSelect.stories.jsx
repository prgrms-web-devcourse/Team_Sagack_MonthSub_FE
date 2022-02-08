import React from 'react';
import { DropListSelect } from '@mocules';

export default {
  title: 'Component/mocules/DropListSelect',
  component: DropListSelect,
};

export const Default = args => (
  <DropListSelect options={['option1', 'option2', 'option3']} {...args} />
);
