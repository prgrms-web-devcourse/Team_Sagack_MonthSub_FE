import React from 'react';
import {
  ConfirmCancleButtons,
  ImageUpload,
  ArticleEditor,
  Wrapper,
} from '@components';
import { useForm } from '@hooks';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { postArticle } from '@apis/article';
import jsonBlob from '@utils/createJsonBlob';

const WriteArticlePage = ({ match, history }) => {
  const { seriesId } = match.params;
  const { values, handleChange, handleSubmit, handleImageUpload } = useForm({
    initialValues: {
      title: '',
      contents: '',
      thumbnailFile: '',
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

        const response = await postArticle({
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
      if (!values.title) {
        newErrors.title = '제목을 입력해주세요.';
        alert('제목을 입력해주세요');
      }
      if (!values.contents) {
        newErrors.contents = '내용을 입력해주세요.';
        alert('내용을 입력해주세요');
      }
      if (!values.thumbnailFile) {
        newErrors.thumbnailFile = '이미지를 업로드 해주세요.';
        alert('이미지를 업로드 해주세요!');
      }
      return newErrors;
    },
  });

  return (
    <StyledWrapper>
      <Form onSubmit={handleSubmit}>
        <ArticleEditor
          title="아티클 작성"
          onChange={handleChange}
          value={values}
        />
        <ImageUpload
          onChange={handleImageUpload}
          name="thumbnail"
          src={values.thumbnailUrl}
        />
        <Buttons confirmName="제출" />
      </Form>
    </StyledWrapper>
  );
};

WriteArticlePage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default WriteArticlePage;

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
