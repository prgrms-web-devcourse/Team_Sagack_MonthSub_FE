import React from 'react';
import InputFile from '@components/commons/InputFile';

export default {
  title: 'Component/InputFile',
  component: InputFile,
};

export const Default = () => (
  <InputFile>
    {file => <button type="button">{file ? file.name : 'Click me'}</button>}
  </InputFile>
);
