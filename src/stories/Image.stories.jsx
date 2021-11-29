import React from 'react';
import Image from '@components/commons/Image';

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    block: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    src: {
      type: { name: 'string', require: true },
      defaultValue: 'https://picsum.photos/200',
      control: { type: 'text' },
    },
    placeholder: {
      type: { name: 'string', require: true },
      defaultValue: 'https://via.placeholder.com/200',
      control: { type: 'text' },
    },
    width: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    height: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    alt: {
      control: 'string',
    },
  },
};

export const Default = args => <Image {...args} />;
