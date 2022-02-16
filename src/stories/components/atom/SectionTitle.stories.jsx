import React from 'react';
import { SectionTitle } from '@atom';

export default {
  title: 'Component/atom/SectionTitle',
  argTypes: {
    size: {
      options: ['small', 'base', 'medium', 'large', 'xLarge'],
      control: { type: 'radio' },
    },
  },
};

export const Default = args => (
  <SectionTitle {...args}>Section Title</SectionTitle>
);
