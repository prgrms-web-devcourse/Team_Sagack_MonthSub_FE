import React, { useState, useEffect } from 'react';
import {
  ConfirmCancleButtons,
  ImageUpload,
  ArticleEditor,
  Wrapper,
} from '@components';
import { useForm } from '@hooks';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { postArticle } from '../../apis/article';
import jsonBlob from '../../utils/createJsonBlob';

const WriteArticlePage = ({ match, history }) => {
  const { id } = match.params;
  const [file, setFile] = useState();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      contents: '',
    },

    onSubmit: async values => {
      if (!file) {
        alert('이미지를 업로드 해주세요!');
        return;
      }

      try {
        const request = {
          ...values,
          seriesId: id,
        };

        const formData = new FormData();
        formData.append('file', file);
        formData.append('request', jsonBlob(request));

        const response = await postArticle({
          data: formData,
        });
        response.status === 200 && history.push(`/articles/${id}`);
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
      return newErrors;
    },
  });

  useEffect(() => {
    const isLogin = sessionStorage.getItem('authorization');
    if (!isLogin) {
      alert('로그인이 필요한 서비스 입니다!');
      history.push('/signin');
    }
  }, []);

  const handleChangefile = file => {
    file && setFile(file);
  };

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
          onChange={handleChangefile}
          valuename="thumbnail"
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
