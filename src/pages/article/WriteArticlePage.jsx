import React from 'react';
import { ArticleForm } from '@organisms';
import { Wrapper } from '@templates';
import styled from '@emotion/styled';
import { useParams, useHistory } from 'react-router-dom';
import { postArticle } from '@apis/article';
import jsonBlob from '@utils/createJsonBlob';

const WriteArticlePage = () => {
  const history = useHistory();
  const { seriesId } = useParams();
  const initialValues = {
    thumbnailFile: '',
    title: '',
    contents: '',
    thumbnailUrl: '',
  };

  const handleSubmit = async values => {
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

      if (response.status === 200) {
        history.push(`/series/${seriesId}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Background>
      <Wrapper>
        <ArticleForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Wrapper>
    </Background>
  );
};

export default WriteArticlePage;

const Background = styled.div`
  background-color: #fff;
`;
