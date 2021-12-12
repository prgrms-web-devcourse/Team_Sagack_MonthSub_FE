import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  Button,
  PageSectionContainer,
  PageSectionTitle,
  ArticleList,
  CommentList,
  Image,
} from '@components';
import { Link } from 'react-router-dom';

const SeriesDetail = ({ detail }) => {
  const commentList = [
    {
      commentId: 1,
      nickname: '홍길동',
      thumbnail: 'img',
      text: '이야 이 서비스 끝내줍니다! 칭찬해~',
      date: '2021-12-02',
    },
    {
      commentId: 2,
      nickname: '뽀식이',
      thumbnail: 'img',
      text: '마크업 힘들어.. 그만할래...ㅜ',
      date: '2021-12-24',
    },
    {
      commentId: 3,
      nickname: '초롱이',
      thumbnail: 'img',
      text: '집갈래~',
      date: '2021-12-31',
    },
  ];

  return (
    <>
      <ViewContainer>
        <div className="imageWrapper">
          <Image
            src={detail.series.thumbnail}
            width="100%"
            height="100%"
            alt="series-detail-image"
          />
        </div>
        <div className="viewArticle">
          <div>
            <div className="viewArticle-title">{detail.series.title}</div>
            <div className="viewArticle-info">
              <div className="userInfo">
                <Link to={`/channel/${detail.writer.userId}`}>
                  <span>
                    <Image
                      src={detail.writer.profileImage}
                      width="100%"
                      height="100%"
                      alt="user-profile"
                    />
                  </span>
                  <span>{detail.writer.nickname}</span>
                </Link>
              </div>
              <div>
                <span>{detail.series.likes}</span> Likes
              </div>
            </div>
            <div className="viewArticle-text">
              {detail.series.introduceText}
            </div>
            <div className="viewArticle-edit">
              <Link to={`/series/edit/${detail.series.id}`}>
                <Button width="100%" height="3.125rem" font-size="1.5rem">
                  수정하기
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <div className="viewArticle-priceInfo">
              <div className="viewArticle-priceInfo-block">
                <div>구독 모집일</div>
                <div>
                  {detail.subscribe.startDate} ~ {detail.subscribe.endDate}
                </div>
              </div>
              <div className="viewArticle-priceInfo-block">
                <div>연재 정보</div>
                <div>
                  <div>
                    <div>총 회차</div>
                    <div>{detail.series.articleCount}</div>
                  </div>
                  <div>
                    <div>연재 기간</div>
                    <div>
                      {detail.series.startDate} ~ {detail.series.endDate}
                    </div>
                  </div>
                  <div>
                    <div>연재 주기</div>
                    <div>
                      {detail.upload.date.map(day => day)},{detail.upload.time}
                    </div>
                  </div>
                </div>
              </div>
              <div className="viewArticle-priceInfo-block">
                <div>구독료</div>
                <div>{detail.series.price} 원</div>
              </div>
              <Link to="/purchase">
                <Button width="100%" height="3.125rem" font-size="1.5rem">
                  결제하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ViewContainer>
      <PageSectionContainer>
        <PageSectionTitle text="연재 목록" />
        <ArticleList list={detail.articleList} />
      </PageSectionContainer>
      <PageSectionContainer>
        <PageSectionTitle text="댓글 목록" />
        <CommentList list={commentList} />
      </PageSectionContainer>
    </>
  );
};
SeriesDetail.defaultProps = {
  detail: {},
};
SeriesDetail.propTypes = {
  detail: PropTypes.object,
};
export default SeriesDetail;
const ViewContainer = styled.div`
  .imageWrapper {
    width: 100%;
    height: 37.5rem;
    margin-bottom: 5rem;
    background-color: #bdbdbd;
  }
  .userInfo {
    display: flex;
    align-details: center;
    span:nth-of-type(1) {
      display: inline-block;
      width: 1.875rem;
      height: 1.875rem;
      border-radius: 50%;
      background-color: grey;
      margin-right: 0.3125rem;
      overflow: hidden;
    }
  }
  .viewArticle {
    display: flex;
    margin-bottom: 3.125rem;
    > div:nth-of-type(1) {
      width: 70%;
      padding-right: 1.875rem;
      display: flex;
      flex-direction: column;
    }
    > div:nth-of-type(2) {
      flex-grow: 1;
    }
    &-title {
      font-size: 2rem;
      margin-bottom: 0.9375rem;
    }
    &-info {
      display: flex;
      align-details: center;
      justify-content: space-between;
      margin-bottom: 0.9375rem;
    }
    &-text {
      line-height: 1.5rem;
      flex-grow: 1;
    }
    &-edit {
      display: flex;
      justify-content: flex-end;
      > div {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5rem;
        background-color: #2d92ff;
        color: white;
        border-radius: 2.5rem;
      }
    }
    &-priceInfo {
      width: 100%;
      padding: 1.5625rem;
      background: rgba(255, 177, 92, 0.2);
      &-block {
        margin-bottom: 1.25rem;
        > div:nth-of-type(1) {
          font-weight: bold;
          font-size: 1.125rem;
          margin-bottom: 0.3125rem;
        }
      }
    }
  }
`;
