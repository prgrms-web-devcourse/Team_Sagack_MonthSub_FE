import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  Image,
  PageSectionTitle,
  PageSectionContainer,
  ArticleList,
  DetailFrom,
} from '@components';
import { useParams, Link } from 'react-router-dom';
import { getSeriesDetail } from '@apis/series';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import convertDay from '@utils/convertDay';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const initialData = {
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
    <Wrapper>
      <ImageArea>
        <Image
          src={detail.series.thumbnail}
          alt="seriesDetailThumbnail"
          width="100%"
          height="auto"
        />
      </ImageArea>
      <MainArea>
        <div>
          <DetailFrom
            previousRoot="/series"
            previousRootText="구독 모집"
            ParentId={detail.series.id}
            title={detail.series.title}
            writerId={detail.writer.userId}
            writerProfileImage={detail.writer.profileImage}
            writerNickname={detail.writer.nickname}
            postDate={detail.subscribe.startDate}
            likes={detail.series.likes}
            bodyText={detail.series.introduceText}
          />
        </div>
        <div>
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
          </SeriesInfo>
        </div>
      </MainArea>
      <ArticleArea>
        <div className="articleAreaHeader">
          <PageSectionTitle text="연재목록" />
          <div>
            <StyeldAddCircleOutlineIcon />
            <Link to={`/series/${detail.series.id}/article/write`}>
              새 아티클 작성하기
            </Link>
          </div>
        </div>
        <PageSectionContainer>
          {detail.articleList.length === 0 ? (
            <div className="articleListNone">
              해당하는 연재 목록이 없습니다. 연재 시작일을 확인해주세요.
            </div>
          ) : (
            <ArticleList
              seriesId={detail.series.id}
              list={detail.articleList}
            />
          )}
        </PageSectionContainer>
      </ArticleArea>
    </Wrapper>
  );
};

export default SeriesDetailPage;

const ImageArea = styled.div`
  width: 100%;
  height: 37.5rem;
  position: relative;
  overflow: hidden;

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
  height: 18.75rem;
  padding: 1.25rem;
  border: 0.0625rem solid ${theme.color.main};
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
    background-color: ${theme.color.greyLight};
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
