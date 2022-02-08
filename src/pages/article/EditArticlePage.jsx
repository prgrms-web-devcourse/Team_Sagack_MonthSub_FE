import React, { useEffect, useState } from 'react';
import { Loading } from '@atom';
import { ArticleForm } from '@organisms';
import { Wrapper } from '@templates';
import jsonBlob from '@utils/createJsonBlob';
import { getArticleDetail, putArticle } from '@apis/article';
import styled from '@emotion/styled';
import { useParams, useHistory } from 'react-router-dom';

const WriteArticlePage = () => {
  const history = useHistory();
  const { seriesId, articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    title: '',
    contents: '',
    thumbnailFile: '',
    thumbnailUrl: '',
  });

  const getInitialData = async ({ seriesId, articleId }) => {
    const { data } = await getArticleDetail({
      seriesId,
      articleId,
    });

    if (!data) {
      setLoading(false);
      return;
    }

    setInitialValues({
      title: data.title,
      contents: data.contents,
      thumbnailFile: '',
      thumbnailUrl: data.thumbnailKey,
    });

    setLoading(false);
  };

  useEffect(() => {
    seriesId && articleId && getInitialData({ seriesId, articleId });
  }, [seriesId, articleId]);

  const handleSubmit = async values => {
    try {
      const request = {
        ...values,
        seriesId,
      };

      const formData = new FormData();
      formData.append('file', values.thumbnailFile);
      formData.append('request', jsonBlob(request));

      const response = await putArticle({
        id: articleId,
        data: formData,
      });

      if (response.status === 200) {
        history.push(`/series/${seriesId}/article/${response.data.id}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Background>
      <Wrapper>
        {loading ? (
          <Loading />
        ) : (
          <ArticleForm
            edit
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        )}
      </Wrapper>
    </Background>
  );
};

export default WriteArticlePage;

const Background = styled.div`
  background-color: #fff;
`;
