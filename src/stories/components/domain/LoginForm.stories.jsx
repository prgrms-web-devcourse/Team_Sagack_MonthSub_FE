import React from 'react';
import { LoginForm } from '@components';

export default {
  title: 'Component/domain/LoginForm',
  component: LoginForm,
  argTypes: {
    onSubmit: {action:'onSubmit'}
  }
}

export const Default = (args) => <LoginForm {...args}/>