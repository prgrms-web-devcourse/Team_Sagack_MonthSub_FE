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
import {
  getArticleDetail,
  putArticle,
  patchArticleImage,
} from '../../apis/article';

const UpdateArticlePage = ({ match, history }) => {
  const { id } = match.params;
  const [file, setFile] = useState();
  const { values, errors, setValues, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      contents: '',
      thumbnailKey: '',
      createdAt: '',
    },
    onSubmit: async values => {
      console.log(file);
      function jsonBlob(obj) {
        return new Blob([JSON.stringify(obj)], {
          type: 'application/json',
        });
      }
      const requestData = {
        title: values.title,
        contents: values.contents,
      };

      const putResponse = await putArticle(jsonBlob(requestData), id);

      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('image', file);
        fileFormData.append('seriesId', Number(id));
        const patchResponse = await patchArticleImage(fileFormData, id);

        putResponse.status === 200 &&
          patchResponse.status === 200 &&
          history.push(`/articles/${id}`);
      } else {
        putResponse.status === 200 && history.push(`/articles/${id}`);
      }
    },
    validate: values => {
      const newErrors = {};
      if (!values.title) newErrors.title = '제목을 입력해주세요.';
      if (!values.contents) newErrors.contents = '내용을 입력해주세요.';
      return newErrors;
    },
  });

  const getArticleContent = async id => {
    const { data } = await getArticleDetail({ id });
    setValues({
      title: data.title,
      contents: data.contents,
      thumbnailKey: data.thumbnailKey,
      createdAt: data.createdAt,
    });
  };

  useEffect(() => {
    const isLogin = sessionStorage.getItem('authorization');
    if (!isLogin) {
      alert('로그인이 필요한 서비스 입니다!');
      history.push('/signin');
    }
    id && getArticleContent(id);
  }, []);

  const handleChangefile = file => {
    file && setFile(file);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>아티클 작성</Title>
        <StyledArticleEditor onChange={handleChange} value={values} />
        <ErrorMessage>{errors.title || errors.content}</ErrorMessage>
        <Title>썸네일 선택</Title>
        <ImageUpload onChange={handleChangefile} valuename="thumbnail" />
        <Buttons confirmName="제출" />
      </Form>
    </Wrapper>
  );
};

UpdateArticlePage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default UpdateArticlePage;

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
