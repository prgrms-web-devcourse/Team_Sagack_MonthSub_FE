import React from 'react';
import useState from 'storybook-addon-state';
import { ImageUpload } from '@molecules';

export default {
  title: 'Component/molecules/ImageUpload',
  component: ImageUpload,
};

export const Default = () => {
  const [fileURL, setFileURL] = useState();

  const handleChange = e => {
    const { files } = e.target;
    const fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      setFileURL(fileReader.result);
    };
  };

  return <ImageUpload onChange={handleChange} src={fileURL} />;
};
