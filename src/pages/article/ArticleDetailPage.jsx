import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Wrapper, Button } from '@components';
import { getArticleDetail } from '@apis/article';
import { useParams, useHistory } from 'react-router-dom';
import theme from '@styles/theme';

const ArticleDetailPage = () => {
  const history = useHistory();
  const { seriesId, articleId } = useParams();
  const [article, setArticle] = useState({
    title: '',
    contents: '',
    thumbnailKey: '',
    createdAt: '',
    isMine: '',
  });

  const getInitialData = async ({ seriesId, articleId }) => {
    try {
      const { data } = await getArticleDetail({ seriesId, articleId });
      setArticle({
        title: data.title,
        contents: data.contents,
        thumbnailKey: data.thumbnailKey,
        createdDate: data.createdDate,
        isMine: data.isMine,
        nickname: data.nickname,
        round: data.round,
      });
    } catch (error) {
      history.goBack();
    }
  };

  useEffect(() => {
    getInitialData({ seriesId, articleId });
  }, []);

  return (
    <>
      <ImageContainer image={article.thumbnailKey}>
        <ImageCover>
          <Content>
            <Title>{article.title}</Title>
            <div>
              <Nickname>by {article.nickname}</Nickname>
              <Date>{article.createdDate}</Date>
            </div>
            {article.isMine ? (
              <StyledButton
                onClick={() =>
                  history.push(`/series/${seriesId}/article/edit/${articleId}`)
                }
              >
                수정하기
              </StyledButton>
            ) : (
              ''
            )}
          </Content>
        </ImageCover>
      </ImageContainer>
      <StyledWrapper>
        <Paragraph>{article.contents}</Paragraph>
      </StyledWrapper>
    </>
  );
};

export default ArticleDetailPage;

const StyledWrapper = styled(Wrapper)`
  padding-top: 5rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 30rem;
  position: relative;
  background-image: ${({ image }) => `url(${image})`};
  background-position: center;
  background-size: cover;
  margin: 3rem 0;
`;

const ImageCover = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 30rem;
  padding: 2rem 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 71.25rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.8);
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
  font-weight: 700;
  padding: 0.7rem 1rem;
  background-color: inherit;
  border-radius: 50px;
  & :hover {
    background-color: ${theme.color.main};
    color: #fff;
    font-weight: 400;
  }
`;

const Title = styled.h1`
  width: 80%;
  height: 100%;
  font-weight: 400;
  font-size: 2.5rem;
  margin-bottom: 1.7rem;
`;

const Nickname = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.7rem;
`;

const Date = styled.span`
  color: rgba(255, 255, 255, 0.5);
`;

const Paragraph = styled.div`
  width: 100%;
  height: 100%;
`;
