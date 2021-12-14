import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Wrapper } from '@components';
import { getArticleDetail } from '@apis/article';
import { useParams } from 'react-router-dom';
import theme from '@styles/theme';

const ArticleDetailPage = () => {
  const { seriesId, articleId } = useParams();
  const [article, setArticle] = useState({
    title: '',
    contents: '',
    thumbnailKey: '',
    createdAt: '',
  });

  const getInitialData = async ({ seriesId, articleId }) => {
    try {
      const { data } = await getArticleDetail({
        data: seriesId,
        id: articleId,
      });
      setArticle({
        title: data.title,
        contents: data.contents,
        thumbnailKey: data.thumbnailKey,
        createdAt: data.createdAt,
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getInitialData({ seriesId, articleId });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>{article.title}</Title>
        <Date>{article.createdAt}</Date>
      </Container>
      <Paragraph>{article.contents}</Paragraph>
    </Wrapper>
  );
};

export default ArticleDetailPage;

const Title = styled.h1`
  width: 80%;
  height: 100%;
  font-weight: 700;
  font-size: 2.5rem;
`;

const Paragraph = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto 8rem;
`;

const Date = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  ${theme.style.boxShadow}: 0 0.25rem 0.25rem -0.25rem #c4c4c4;
  padding: ${theme.font.base} 0;
`;
