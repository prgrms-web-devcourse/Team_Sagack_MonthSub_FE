import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  Image,
  SectionTitle,
  SectionContainer,
  ArticleList,
  DetailForm,
  Button,
  ContentAddLink,
  Loading,
} from '@components';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getSeriesDetail } from '@apis/series';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import convertDay from '@utils/convertDay';

export const initialData = {
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

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(initialData);
  const history = useHistory();

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

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageArea>
            <Image
              src={detail.series.thumbnail}
              alt="seriesDetailThumbnail"
              width="100%"
              height="auto"
            />
          </ImageArea>
          <Wrapper>
            <MainArea>
              <div>
                <DetailForm
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
              <InfoArea>
                <SeriesInfoHead>INFORMATION</SeriesInfoHead>
                <SeriesInfo>
                  <SeriesInfoSection>
                    <div>구독 정보</div>
                    <div className="seriesInfoBlock">
                      <div>모집일</div>
                      {detail.subscribe.startDate} ~ {detail.subscribe.endDate}
                    </div>
                    <div className="seriesInfoBlock">
                      <div>구독료</div>
                      {detail.series.price} 원
                    </div>
                  </SeriesInfoSection>
                  <SeriesInfoSection>
                    <div>연재 정보</div>
                    <div className="seriesInfoBlock">
                      <div>연재 일</div>
                      {detail.series.startDate} ~ {detail.series.endDate}
                    </div>
                    <div className="seriesInfoBlock">
                      <div>연재 주기</div>
                      {convertDay(detail.upload.date).join(', ')}
                      &nbsp;{detail.upload.time} 시
                    </div>
                    <div className="seriesInfoBlock">
                      <div>총 회차</div>
                      {detail.series.articleCount} 회
                    </div>
                  </SeriesInfoSection>
                  <SeriesInfoSection>
                    <Link to={`/purchase/${detail.series.id}`}>
                      {sessionStorage.getItem('authorization') &&
                      !detail.isMine ? (
                        <Button
                          className="seriesPurchase"
                          width="100%"
                          height="2.8125rem"
                          margin={0}
                        >
                          결제하기
                        </Button>
                      ) : null}
                    </Link>
                  </SeriesInfoSection>
                </SeriesInfo>
              </InfoArea>
            </MainArea>
            <ArticleArea>
              <div className="articleAreaHeader">
                <SectionTitle>연재 목록</SectionTitle>
                <div>
                  {detail.isMine ? (
                    <ContentAddLink
                      url={`/series/${detail.series.id}/article/write`}
                    >
                      새 아티클 작성하기
                    </ContentAddLink>
                  ) : null}
                </div>
              </div>
              <SectionContainer>
                {detail.articleList.length ? (
                  <ArticleList
                    seriesId={detail.series.id}
                    list={detail.articleList}
                  />
                ) : (
                  <div className="articleListNone">
                    해당하는 연재 목록이 없습니다. 연재 시작일을 확인해주세요.
                  </div>
                )}
              </SectionContainer>
            </ArticleArea>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default SeriesDetailPage;

const Container = styled.div`
  background-color: #fff;
`;

const ImageArea = styled.div`
  width: 100%;
  height: 30rem;
  position: relative;
  overflow: hidden;
  margin-top: 5rem;

  > * {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;

const MainArea = styled.div`
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

const InfoArea = styled.div`
  border-radius: 1rem 1rem 0 0;
  box-shadow: ${theme.style.boxShadow};
  margin-left: 3rem;
`;

const SeriesInfoHead = styled.div`
  border-radius: 1rem 1rem 0 0;
  background-color: orange;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: ${theme.font.medium};
  font-weight: bold;
`;

const SeriesInfo = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem 1.5rem;
  background-color: #ffffff;
  > div:nth-of-type(1) {
    margin-bottom: 2rem;
  }
`;

const SeriesInfoSection = styled.div`
  > div:nth-of-type(1) {
    font-weight: bold;
    font-size: ${theme.font.medium};
    margin-bottom: 0.5rem;
  }

  .seriesInfoBlock {
    margin-top: 1rem;

    > div:nth-of-type(1) {
      font-weight: 700;
      margin: 0 1rem 0.5rem 0;
      color: ${theme.color.main};
    }
  }

  .seriesPurchase {
    margin-top: 1.5rem;
  }
`;

const ArticleArea = styled.div`
  margin-top: 4rem;
  .articleListNone {
    background-color: ${theme.color.grey};
    height: 10rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.color.greyDark};
  }

  .articleAreaHeader {
    display: flex;

    > *:nth-of-type(2) {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 1.25rem;
    }
  }
`;
