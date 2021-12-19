import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  Image,
  SectionTitle,
  SectionContainer,
  ArticleList,
  DetailForm,
  Button,
} from '@components';
import { useParams, Link } from 'react-router-dom';
import { getSeriesDetail } from '@apis/series';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import convertDay from '@utils/convertDay';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  const [detail, setDetail] = useState(initialData);

  const getInitialData = async () => {
    const { data } = await getSeriesDetail({ id });
    setDetail(data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
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
                  <span>모집 일</span>
                  {detail.subscribe.startDate} ~ {detail.subscribe.endDate}
                </div>
                <div className="seriesInfoBlock">
                  <span>구독료</span>
                  {detail.series.price} 원
                </div>
              </SeriesInfoSection>
              <SeriesInfoSection>
                <div>연재 정보</div>
                <div className="seriesInfoBlock">
                  <span>연재 일</span>
                  {detail.series.startDate} ~ {detail.series.endDate}
                </div>
                <div className="seriesInfoBlock">
                  <span>연재 주기</span>
                  {convertDay(detail.upload.date).join(', ')}
                  &nbsp;{detail.upload.time} 시
                </div>
                <div className="seriesInfoBlock">
                  <span>총 회차</span>
                  {detail.series.articleCount} 회
                </div>
              </SeriesInfoSection>
              <SeriesInfoSection>
                <Link to={`/purchase/${detail.series.id}`}>
                  {sessionStorage.getItem('authorization') && !detail.isMine ? (
                    <Button width="100%" height="2.8125rem" margin={0}>
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
                <>
                  <StyeldAddCircleOutlineIcon />
                  <Link to={`/series/${detail.series.id}/article/write`}>
                    새 아티클 작성하기
                  </Link>
                </>
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
  );
};

export default SeriesDetailPage;

const ImageArea = styled.div`
  width: 100%;
  height: 37.5rem;
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
  padding: 1.25rem;
  background-color: #ffffff;
`;

const SeriesInfoSection = styled.div`
  margin-bottom: 1.875rem;

  > div:nth-of-type(1) {
    font-weight: bold;
    font-size: ${theme.font.medium};
  }

  .seriesInfoBlock {
    margin-top: 0.625rem;

    > span:nth-of-type(1) {
      margin-right: 0.625rem;
      color: ${theme.color.main};
    }
  }
`;

const ArticleArea = styled.div`
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

const StyeldAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  color: ${theme.color.greyDark};
`;
