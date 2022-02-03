import React from 'react';
import { Upload, Button } from '@atom';
import styled from '@emotion/styled';

export default {
  title: 'Component/atom/Upload',
  component: Upload,
  argTypes: {
    accept: { defaultValue: '.jpg, .png, .jpeg', control: { type: 'text' } },
    disabled: { defaultValue: false, control: { type: 'boolean' } },
  },
};

const FileName = styled.p`
  margin-top: 0.5rem;
`;

export const Default = args => (
  <Upload {...args}>
    {file => (
      <>
        <Button circle>Click me</Button>
        <FileName>{file ? file.name : '선택된 파일이 없습니다'}</FileName>
      </>
    )}
  </Upload>
);
