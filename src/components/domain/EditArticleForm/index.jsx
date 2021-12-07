import React, { useState } from 'react';
import { ConfirmCancleButtons, Upload, Image } from '@components';
import { useForm } from '@hooks';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ArticleEditor from './ArticleEditor';

const EditArticleForm = ({ onSubmit }) => {
  const [file, setFile] = useState({});
  const {
    values,
    // errors,
    // setValues,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: async data => {
      function jsonBlob(obj) {
        return new Blob([JSON.stringify(obj)], {
          type: 'application/json',
        });
      }

      const formData = new FormData();
      formData.append('thumbnail', file);
      formData.append('request', jsonBlob(data));

      onSubmit && (await onSubmit(formData));
    },
    validate: ({ values }) => {
      const newErrors = {};
      if (!values.title) newErrors.title = '제목을 입력해주세요.';
      if (!values.content) newErrors.content = '내용을 입력해주세요.';
      return newErrors;
    },
  });

  const handleChangefile = file => {
    file && setFile(file);
  };

  console.log(values, file);

  return (
    <Form onSubmit={handleSubmit}>
      <ArticleEditor onChange={handleChange} value={values} />
      <div>
        <UploadImage src="" alt="thumbnail" />
        <Upload name="thumbnail" onChange={handleChangefile}>
          {file => (
            <div>
              <button type="button">{file ? file.name : 'Click me'}</button>
              <span>{file ? file.name : ''}</span>
            </div>
          )}
        </Upload>
      </div>
      <Buttons confirmName="제출" />
    </Form>
  );
};

EditArticleForm.defaultProps = {
  onSubmit: () => {},
};

EditArticleForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default EditArticleForm;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
`;

const Buttons = styled(ConfirmCancleButtons)`
  margin-top: 2rem;
`;

const UploadImage = styled(Image)`
  width: 10rem;
  height: 10rem;
`;
