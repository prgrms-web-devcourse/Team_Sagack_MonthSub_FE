import React, { useEffect, useState } from 'react';
import { Loading, Image } from '@atom';
import {
  ArticleList,
  DetailContent,
  CommentList,
  DetailInfo,
} from '@organisms';
import { Wrapper } from '@templates';
import { useParams, useHistory } from 'react-router-dom';
import { getSeriesDetail } from '@apis/series';
import styled from '@emotion/styled';
import { theme, mixin } from '@styles';

const SeriesDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();

  const getInitialData = async () => {
    const { data } = await getSeriesDetail({ id });

    if (!data) {
      history.push('/server-error');
      return;
    }

    setDetail(data);
    setLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  if (loading) return <Loading />;

  return (
    <Wrapper>
      <ImageSection>
        <Image
          src={detail.series.thumbnail}
          alt="seriesDetailThumbnail"
          width="100%"
          height="auto"
        />
      </ImageSection>
      <InfoSection>
        <DetailInfo
          subscribe={detail.subscribe}
          series={detail.series}
          upload={detail.upload}
          isMine={detail.isMine}
        />
      </InfoSection>
      <MainSection>
        <DetailContent
          previousRoot="/series"
          previousRootText="구독 모집"
          parentId={detail.series.id}
          title={detail.series.title}
          writerId={detail.writer.userId}
          writerProfileImage={detail.writer.profileImage}
          writerNickname={detail.writer.nickname}
          postDate={detail.subscribe.startDate}
          likes={detail.series.likes}
          bodyText={detail.series.introduceText}
          isMine={detail.isMine}
          isLiked={detail.isLiked}
        />
      </MainSection>
      <ArticleSection>
        <ArticleList
          isMine={detail.isMine}
          seriesId={detail.series.id}
          list={detail.articleList}
        />
      </ArticleSection>
      <CommentSection>
        <CommentList />
      </CommentSection>
    </Wrapper>
  );
};

export default SeriesDetailPage;

const ImageSection = styled.div`
  ${mixin.fullScreen}
  height: 30rem;
  overflow: hidden;

  > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainSection = styled.div`
  display: flex;
  margin: 2.5rem 0;

  > div:nth-of-type(1) {
    flex-grow: 1;
    padding-right: 1.25rem;
  }

  > div:nth-of-type(2) {
    width: 20rem;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 2.5rem;
`;

const ArticleSection = styled.div`
  margin-top: 4rem;

  .articleSectionHeader {
    display: flex;
    justify-content: space-between;

    > *:nth-of-type(2) {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
      align-items: center;
    }
  }
`;

const CommentSection = styled.div`
  margin-top: 4rem;
`;
