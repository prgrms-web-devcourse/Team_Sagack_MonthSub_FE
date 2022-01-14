import React, { useEffect } from 'react';
import { ConfirmCancleButtons, ImageUpload } from '@components';
import { useForm } from '@hooks';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { postArticle, putArticle } from '@apis/article';
import jsonBlob from '@utils/createJsonBlob';
import { useHistory } from 'react-router-dom';
import createEmptyValueMessage from '@utils/createEmptyValueMessage';
import theme from '@styles/theme';
import ArticleEditor from './ArticleEditor';

const ArticleForm = ({ edit, param, articleData, ...props }) => {
  const history = useHistory();
  const { seriesId, articleId } = param;
  const { values, setValues, handleChange, handleSubmit, handleImageUpload } =
    useForm({
      initialValues: {
        thumbnailFile: '',
        title: '',
        contents: '',
        thumbnailUrl: '',
      },

      onSubmit: async values => {
        try {
          const request = {
            ...values,
            seriesId,
          };

          const formData = new FormData();
          formData.append('file', values.thumbnailFile);
          formData.append('request', jsonBlob(request));

          const response = edit
            ? await putArticle({
                id: articleId,
                data: formData,
              })
            : await postArticle({
                data: formData,
              });

          response.status === 200 &&
            history.push(`/series/${seriesId}/article/${response.data.id}`);
        } catch (error) {
          alert(error);
        }
      },
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

  useEffect(() => {
    if (edit) {
      setValues(articleData);
    }
  }, [articleData, edit]);

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
  articleData: {},
};

ArticleForm.propTypes = {
  edit: PropTypes.bool,
  articleData: PropTypes.object,
  param: PropTypes.object.isRequired,
};

export default ArticleForm;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

const Buttons = styled(ConfirmCancleButtons)`
  margin-top: 2rem;
`;
