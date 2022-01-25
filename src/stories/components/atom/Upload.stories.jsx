import React from 'react';
import { Upload } from '@atom';

export default {
  title: 'Component/atom/Upload',
  component: Upload,
};

export const Default = () => (
  <Upload>
    {file => <button type="button">{file ? file.name : 'Click me'}</button>}
  </Upload>
);
