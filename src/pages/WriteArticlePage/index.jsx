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

const WriteArticlePage = ({ match, history }) => {
  const { id } = match.params;
  const [file, setFile] = useState({});
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      contents: '',
    },

    onSubmit: async values => {
      function jsonBlob(obj) {
        return new Blob([JSON.stringify(obj)], {
          type: 'application/json',
        });
      }

      const request = {
        ...values,
        seriesId: id,
      };

      const formData = new FormData();
      formData.append('file', file);
      formData.append('request', jsonBlob(request));

      const response = await postArticle(formData);
      response.status === 200 && history.push(`/articles/${id}`);
    },
    validate: values => {
      const newErrors = {};
      if (!values.title) newErrors.title = '제목을 입력해주세요.';
      if (!values.contents) newErrors.contents = '내용을 입력해주세요.';
      if (!file) newErrors.file = '이미지를 업로드 해주세요!';
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
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>아티클 작성 </Title>
        <StyledArticleEditor onChange={handleChange} value={values} />
        <ErrorMessage>{errors.title || errors.contents}</ErrorMessage>
        <Title>썸네일 선택</Title>
        <ImageUpload onChange={handleChangefile} valuename="thumbnail" />
        <Buttons confirmName="제출" />
      </Form>
    </Wrapper>
  );
};

WriteArticlePage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default WriteArticlePage;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
`;

const StyledArticleEditor = styled(ArticleEditor)``;

const Buttons = styled(ConfirmCancleButtons)`
  margin-top: 2rem;
`;

const Title = styled.h4`
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ErrorMessage = styled.span`
  display: block;
  height: 3rem;
  color: #ffb15c;
`;
