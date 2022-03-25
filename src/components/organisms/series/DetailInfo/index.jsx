import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { theme, mixin } from '@styles';
import { Button } from '@atom';
import convertDay from '@utils/convertDay';
import { Link } from 'react-router-dom';

const DetailInfo = ({ subscribe, series, upload, isMine }) => (
  <SeriesInfo>
    <div>작품 정보</div>
    <SeriesInfoSection>
      <div className="seriesInfoBlock">
        <div>모집일</div>
        <div>
          {subscribe.startDate} ~ {subscribe.endDate}
        </div>
      </div>
      <div className="seriesInfoBlock">
        <div>구독료</div>
        <div>{series.price} 원</div>
      </div>
      <div className="seriesInfoBlock">
        <div>연재 일</div>
        <div>
          {series.startDate} ~ {series.endDate}
        </div>
      </div>
      <div className="seriesInfoBlock">
        <div>연재 주기</div>
        <div>
          {convertDay(upload.date).join(', ')}
          &nbsp;{upload.time} 시
        </div>
      </div>
      <div className="seriesInfoBlock">
        <div>총 회차</div>
        <div>{series.articleCount} 회</div>
      </div>
    </SeriesInfoSection>
    {sessionStorage.getItem('authorization') && !isMine ? (
      <Link to={`/purchase/${series.id}`}>
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
);

DetailInfo.defaultProps = {
  subscribe: {},
  series: {},
  upload: {},
  isMine: false,
};

DetailInfo.propTypes = {
  subscribe: PropTypes.object,
  series: PropTypes.object,
  upload: PropTypes.object,
  isMine: PropTypes.bool,
};

export default DetailInfo;

const SeriesInfo = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem 1.5rem;
  background-color: #ffffff;
  border-radius: 0.625rem;
  box-shadow: ${theme.style.boxShadow};
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
