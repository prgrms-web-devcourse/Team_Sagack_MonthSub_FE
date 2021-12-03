import React from 'react';
import {
  Wrapper,
  SeriesDetail,
  PageSectionContainer,
  PageSectionTitle,
  ArticleList,
  CommentList
} from '@components';
import dummy from './seriesDetail.json';

const SeriesDetailPage = () => {
  const commentList = [
    { commentId: 1, nickname: '홍길동', thumbnail: 'img', text: '이야 이 서비스 끝내줍니다! 칭찬해~', date: '2021-12-02' },
    { commentId: 2, nickname: '뽀식이', thumbnail: 'img', text: '마크업 힘들어.. 그만할래...ㅜ', date: '2021-12-24' },
    { commentId: 3, nickname: '초롱이', thumbnail: 'img', text: '집갈래~', date: '2021-12-31' },
  ];

  return (
    <Wrapper>
      <SeriesDetail detail={ dummy.data } />
      
      <PageSectionContainer>
        <PageSectionTitle text='연재 목록' />
        <ArticleList list={ dummy.data.articleList } />
      </PageSectionContainer>

      <PageSectionContainer>
        <PageSectionTitle text='댓글 목록' />
        <CommentList list={ commentList } />
      </PageSectionContainer>
    </Wrapper>
  );
}

export default SeriesDetailPage;