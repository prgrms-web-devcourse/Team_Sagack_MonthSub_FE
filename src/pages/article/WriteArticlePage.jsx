import React from 'react';
import { ArticleForm } from '@organisms';
import { Wrapper } from '@templates';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

const WriteArticlePage = () => {
  const { seriesId, articleId } = useParams();
  return (
    <Background>
      <Wrapper>
        <ArticleForm param={{ seriesId, articleId }} />
      </Wrapper>
    </Background>
  );
};

export default WriteArticlePage;

const Background = styled.div`
  background-color: #fff;
`;
