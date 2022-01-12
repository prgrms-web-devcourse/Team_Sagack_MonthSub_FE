import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Wrapper, Button, Loading } from '@components';
import { getArticleDetail } from '@apis/article';
import { useParams, useHistory } from 'react-router-dom';
import { theme, mixin } from '@styles';
import replaceEnter from '@utils/replaceEnter';

const ArticleDetailPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { seriesId, articleId } = useParams();
  const [article, setArticle] = useState({
    title: '',
    contents: '',
    thumbnailUrl: '',
    createdAt: '',
    isMine: '',
  });

  const getInitialData = async ({ seriesId, articleId }) => {
    const { data } = await getArticleDetail({ seriesId, articleId });

    if (!data) {
      history.goBack();
      return;
    }

    setArticle({
      title: data.title,
      contents: data.contents,
      thumbnailUrl: data.thumbnailKey,
      createdDate: data.createdDate,
      isMine: data.isMine,
      nickname: data.nickname,
      round: data.round,
    });
    setLoading(false);
  };

  useEffect(() => {
    getInitialData({ seriesId, articleId });
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageContainer image={article.thumbnailUrl}>
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
                      history.push(
                        `/series/${seriesId}/article/edit/${articleId}`,
                      )
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
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: replaceEnter(article.contents),
            }}
          />
        </>
      )}
    </Wrapper>
  );
};

export default ArticleDetailPage;

const ImageContainer = styled.div`
  ${mixin.fullScreen}
  background-image: ${({ image }) => `url(${image})`};
  background-position: center;
  background-size: cover;
`;

const ImageCover = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
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
  @media ${theme.device.tablet} {
    max-width: 100%;
    padding: 0 2.5rem;
  }
  @media ${theme.device.mobile} {
    max-width: 100%;
    padding: 0 1rem;
  }
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
  font-size: ${theme.font.xLarge};
  margin-bottom: 1.7rem;
`;

const Nickname = styled.div`
  font-size: ${theme.font.medium};
  margin-bottom: 0.7rem;
`;

const Date = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: ${theme.font.small};
`;

const Paragraph = styled.div`
  width: 100%;
  min-height: 40vh;
  font-size: 1rem;
  line-height: 1.7rem;
`;
