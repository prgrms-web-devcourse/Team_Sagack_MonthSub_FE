import React from 'react';
import { ImageUpload, ConfirmButtons } from '@molecules';
import { useForm } from '@hooks';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import createEmptyValueMessage from '@utils/createEmptyValueMessage';
import theme from '@styles/theme';
import ArticleEditor from './ArticleEditor';

const ArticleForm = ({ edit, initialValues, onSubmit, ...props }) => {
  const { values, handleChange, handleSubmit, handleImageUpload } = useForm({
    initialValues,
    onSubmit,
    validate: values => {
      const newErrors = {};

      for (const key in values) {
        if (!values[key]) {
          if (edit && key === 'thumbnailFile') {
            return;
          }
          newErrors.empty = createEmptyValueMessage(key);
          alert(newErrors.empty);

          break;
        }
      }

      return newErrors;
    },
  });
  return (
    <Form onSubmit={handleSubmit} {...props}>
      <ImageUpload
        onChange={handleImageUpload}
        name="thumbnail"
        src={values.thumbnailUrl}
        wide={+true}
      />
      <ArticleEditor onChange={handleChange} value={values} />
      <Buttons confirmName="제출" />
    </Form>
  );
};

ArticleForm.defaultProps = {
  edit: false,
  initialValues: {},
  onSubmit: () => {},
};

ArticleForm.propTypes = {
  edit: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ArticleForm;

const Buttons = styled(ConfirmButtons)`
  margin-top: 2rem;
`;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;
