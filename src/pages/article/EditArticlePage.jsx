import React, { useEffect } from 'react';
import {
  ConfirmCancleButtons,
  ImageUpload,
  ArticleEditor,
  Wrapper,
} from '@components';
import { useForm } from '@hooks';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getArticleDetail, putArticle } from '@apis/article';
import jsonBlob from '@utils/createJsonBlob';

const EditArticlePage = ({ match, history }) => {
  const { seriesId, articleId } = match.params();
  const { values, setValues, handleChange, handleSubmit, handleImageUpload } =
    useForm({
      initialValues: {
        title: '',
        contents: '',
        createdAt: '',
        thumbnailKey: '',
        thumbnailKeyFile: {},
      },
      onSubmit: async values => {
        try {
          const request = {
            title: values.title,
            contents: values.contents,
          };
          const formData = new FormData();
          formData.append('file', values.thumbnailFile);
          formData.append('request', jsonBlob(request));
          const response = await putArticle({
            data: formData,
          });
          response.status === 200 &&
            history.push(`/series/${seriesId}/article/${articleId}`);
        } catch (error) {
          alert(error);
        }
      },
      validate: values => {
        const newErrors = {};
        if (!values.title) {
          newErrors.title = '제목을 입력해주세요.';
          alert('제목을 입력해주세요.');
        }
        if (!values.contents) {
          newErrors.contents = '내용을 입력해주세요.';
          alert('내용을 입력해주세요.');
        }
        return newErrors;
      },
    });

  const getInitialData = async ({ seriesId, articleId }) => {
    const { data } = await getArticleDetail({
      seriesId,
      articleId,
    });
    setValues({
      title: data.title,
      contents: data.contents,
      thumbnailKey: data.thumbnailKey,
      createdAt: data.createdAt,
    });
  };

  useEffect(() => {
    getInitialData({ seriesId, articleId });
  }, []);

  return (
    <StyledWrapper>
      <Form onSubmit={handleSubmit}>
        <ArticleEditor
          title="아티클 작성"
          onChange={handleChange}
          value={values}
        />
        <ImageUpload
          title="썸네일 선택"
          onChange={handleImageUpload}
          name="thumbnail"
          url={values.thumbnailKey}
        />
        <Buttons confirmName="제출" />
      </Form>
    </StyledWrapper>
  );
};

EditArticlePage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default EditArticlePage;

const StyledWrapper = styled(Wrapper)`
  padding: 9rem 0 4rem 0;
`;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
`;

const Buttons = styled(ConfirmCancleButtons)`
  margin-top: 2rem;
`;
