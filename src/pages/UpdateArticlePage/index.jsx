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
  putArticleImage,
} from '../../apis/article';
import jsonBlob from '../../utils/createJsonBlob';

const UpdateArticlePage = ({ match, history }) => {
  const { id } = match.params;
  const [file, setFile] = useState();
  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      contents: '',
      thumbnailKey: '',
      createdAt: '',
    },
    onSubmit: async values => {
      try {
        const requestData = {
          title: values.title,
          contents: values.contents,
        };

        const textResponse = await putArticle({
          data: jsonBlob(requestData),
          params: id,
        });

        if (file) {
          const fileFormData = new FormData();
          fileFormData.append('file', file);
          fileFormData.append('request', jsonBlob({ seriesId: id }));

          const fileResponse = await putArticleImage({
            data: fileFormData,
            params: id,
          });

          textResponse.status === 200 &&
            fileResponse.status === 200 &&
            history.push(`/articles/${id}`);
        } else {
          textResponse.status === 200 && history.push(`/articles/${id}`);
        }
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

  const getArticleContent = async id => {
    const { data } = await getArticleDetail({
      params: id,
    });
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
          url={values.thumbnailKey}
        />
        <Buttons confirmName="제출" />
      </Form>
    </StyledWrapper>
  );
};

UpdateArticlePage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default UpdateArticlePage;

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
