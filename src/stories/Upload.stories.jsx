import React from 'react';
import Upload from '@components/commons/Upload';

export default {
  title: 'Component/Upload',
  component: Upload,
};

export const Default = () => (
  <Upload>
    {file => <button type="button">{file ? file.name : 'Click me'}</button>}
  </Upload>
);
