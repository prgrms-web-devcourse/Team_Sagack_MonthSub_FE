import React from 'react';
import { ButtonSelect } from '@components';

export default {
  title: 'Component/domain/ButtonSelect',
  component: ButtonSelect,
};

export const Radio = args => (
  <ButtonSelect
    type="radio"
    name="radio"
    labels={['option1', 'option2', 'option3']}
    {...args}
  />
);

export const checkBox = args => (
  <ButtonSelect
    type="checkbox"
    name="checkbox"
    labels={['option1', 'option2', 'option3']}
    {...args}
  />
);
