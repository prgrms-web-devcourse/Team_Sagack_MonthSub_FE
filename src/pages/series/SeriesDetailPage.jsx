import React, { useEffect, useState } from 'react';
import { Loading, Image, Button } from '@atom';
import { ContentAddLink } from '@mocules';
import { ArticleList, DetailBody, CommentList } from '@organisms';
import { Wrapper, SectionContainer } from '@templates';
import { useParams, Link, useHistory } from 'react-router-dom';
import {
  getSeriesDetail,
  postSeriesComment,
  getSeriesComment,
  putSeriesComment,
  deleteSeriesComment,
} from '@apis/series';
import styled from '@emotion/styled';
import { theme, mixin } from '@styles';
import convertDay from '@utils/convertDay';

const initialData = {
  isMine: false,
  isLiked: false,
  series: {
    id: 0,
    thumbnail: '',
    title: '',
    introduceText: '',
    introduceSentence: '',
    price: 0,
    startDate: '',
    endDate: '',
    articleCount: 0,
    likes: 0,
  },
  upload: {
    date: [],
    time: '',
  },
  subscribe: {
    startDate: '',
    endDate: '',
    status: '',
  },
  category: '',
  writer: {
    id: 0,
    userId: 0,
    followCount: 0,
    email: '',
    profileImage: '',
    profileIntroduce: '',
    nickname: '',
  },
  articleList: [
    {
      articleId: 0,
      title: '',
      round: 0,
      date: '',
    },
  ],
};

const APIUrl = {
  create: postSeriesComment,
  read: getSeriesComment,
  update: putSeriesComment,
  delete: deleteSeriesComment,
};

const SeriesDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [detail, setDetail] = useState(initialData);

  const readSeriesDetail = async () => {
    const { data } = await getSeriesDetail({ id });

    if (!data) {
      history.push('/server-error');
      return;
    }

    setDetail(data);
    setLoading(false);
  };

  useEffect(() => {
    readSeriesDetail();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageSection>
            <Image
              src={detail.series.thumbnail}
              alt="seriesDetailThumbnail"
              width="100%"
              height="auto"
            />
          </ImageSection>
          <InfoSection>
            <SeriesInfo>
              <div>작품 정보</div>
              <SeriesInfoSection>
                <div className="seriesInfoBlock">
                  <div>모집일</div>
                  <div>
                    {detail.subscribe.startDate} ~ {detail.subscribe.endDate}
                  </div>
                </div>
                <div className="seriesInfoBlock">
                  <div>구독료</div>
                  <div>{detail.series.price} 원</div>
                </div>
                <div className="seriesInfoBlock">
                  <div>연재 일</div>
                  <div>
                    {detail.series.startDate} ~ {detail.series.endDate}
                  </div>
                </div>
                <div className="seriesInfoBlock">
                  <div>연재 주기</div>
                  <div>
                    {convertDay(detail.upload.date).join(', ')}
                    &nbsp;{detail.upload.time} 시
                  </div>
                </div>
                <div className="seriesInfoBlock">
                  <div>총 회차</div>
                  <div>{detail.series.articleCount} 회</div>
                </div>
              </SeriesInfoSection>
              {sessionStorage.getItem('authorization') && !detail.isMine ? (
                <Link to={`/purchase/${detail.series.id}`}>
                  <SeriesInfoSection>
                    <Button
                      className="seriesPurchase"
                      width="100%"
                      height="2.8125rem"
                      margin={0}
                    >
                      결제하기
                    </Button>
                  </SeriesInfoSection>
                </Link>
              ) : null}
            </SeriesInfo>
          </InfoSection>
          <MainSection>
            <div>
              <DetailBody
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
            </div>
          </MainSection>
          <ArticleSection>
            <div className="articleSectionHeader">
              <SectionContainer title="연재 목록" />
              {detail.isMine ? (
                <ContentAddLink
                  url={`/series/${detail.series.id}/article/write`}
                >
                  새 아티클 작성하기
                </ContentAddLink>
              ) : null}
            </div>
            <SectionContainer>
              <ArticleList
                seriesId={detail.series.id}
                list={detail.articleList}
              />
            </SectionContainer>
          </ArticleSection>
          <CommentSection>
            <CommentList API={APIUrl} />
          </CommentSection>
        </>
      )}
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

const SeriesInfo = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem 1.5rem;
  background-color: #ffffff;
  border-radius: 0.625rem;
  box-shadow: ${theme.style.boxShadow};

  > div:nth-of-type(1) {
    font-weight: 700;
    font-size: ${theme.font.large};
    margin-bottom: 1.25rem;
  }
`;

const SeriesInfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;

  .seriesInfoBlock {
    display: flex;
    padding-left: 0.625rem;
    margin: 0.125rem 0;
    margin-right: 0.625rem;
    border-left: 2px solid ${theme.color.grey};

    > div:nth-of-type(1) {
      margin-right: 0.625rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${theme.color.main};
    }

    > div:nth-of-type(2) {
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .seriesPurchase {
    margin-top: 1.5rem;
  }
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
