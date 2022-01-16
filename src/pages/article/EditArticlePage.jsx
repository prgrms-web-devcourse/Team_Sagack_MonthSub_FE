import React, { useEffect, useState } from 'react';
import { Loading } from '@atom';
import { ArticleForm } from '@organisms';
import { Wrapper } from '@templates';
import { getArticleDetail } from '@apis/article';
import styled from '@emotion/styled';
import { useParams, useHistory } from 'react-router-dom';

const WriteArticlePage = () => {
  const history = useHistory();
  const { seriesId, articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState({
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
      history.push('/server-error');
      return;
    }

    setArticleData({
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

  return (
    <Background>
      <Wrapper>
        {loading ? (
          <Loading />
        ) : (
          <ArticleForm
            edit
            param={{ seriesId, articleId }}
            articleData={articleData}
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
