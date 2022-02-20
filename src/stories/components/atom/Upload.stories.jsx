import React from 'react';
import useState from 'storybook-addon-state';
import { Upload, Button } from '@atom';
import styled from '@emotion/styled';

export default {
  title: 'Component/atom/Upload',
  component: Upload,
};

export const Default = () => {
  const [fileURL, setFileURL] = useState();

  const handleChange = e => {
    const { files } = e.target;
    setFileURL(files[0].name);
  };

  const FileName = styled.p`
    margin-top: 0.5rem;
  `;

  return (
    <Upload onChange={handleChange}>
      <Button>click me</Button>
      <FileName>{fileURL || 'fileName'}</FileName>
    </Upload>
  );
};
