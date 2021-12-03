import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Button } from '@components';

const SeriesDetail = ({ detail }) => (
  <ViewContainer>
    <div className="imageWrapper">{ detail.thumbnail }</div>
    <div className="viewArticle">
      <div>
        <div className="viewArticle-title">{ detail.title }</div>
        <div className="viewArticle-info">
          <div className="userInfo">
            <span />
            <span>{ detail.nickname }</span>
          </div>
          <div>
            <span>{ detail.likes }</span> Likes
          </div>
        </div>
        <div className="viewArticle-text">
          { detail.introduce_text }
        </div>
      </div>
      <div>
        <div className="viewArticle-priceInfo">
          <div className="viewArticle-priceInfo-block">
            <div>구독 모집일</div>
            <div>{ detail.subscribe_start_date } ~ { detail.subscribe_end_date }</div>
          </div>
          <div className="viewArticle-priceInfo-block">
            <div>연재 정보</div>
            <div>
              <div>
                <div>총 회차</div>
                <div>{ detail.article_count }</div>
              </div>
              <div>
                <div>연재 기간</div>
                <div>{ detail.start_date } ~ { detail.end_date }</div>
              </div>
              <div>
                <div>연재 주기</div>
                <div>매주 월, 금</div>
              </div>
            </div>
          </div>
          <div className="viewArticle-priceInfo-block">
            <div>구독료</div>
            <div>{ detail.price } 원</div>
          </div>
          <Button
            width="100%"
            height="3.125rem"
            font-size="1.5rem"
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  </ViewContainer>
);

SeriesDetail.defaultProps = {
  detail: '',
}

SeriesDetail.propTypes = {
  detail: PropTypes.node,
}

export default SeriesDetail;

const ViewContainer = styled.div`
  .imageWrapper {
    width: 100%;
    max-height: 53.4375rem;
    padding-bottom: 75%;
    margin-bottom: 5rem;
    background-color: grey;
  }

  .userInfo {
    display: flex;
    align-details: center;

    > span:nth-child(1) {
      display: inline-block;
      width: 1.875rem;
      height: 1.875rem;
      border-radius: 50%;
      background-color: grey;
      margin-right: 0.3125rem;
    }
  }

  .viewArticle {
    display: flex;
    margin-bottom: 3.125rem;

    > div:nth-child(1) {
      width: 70%;
      padding-right: 1.875rem;
    }

    > div:nth-child(2) {
      flex-grow: 1;
    }
    
    &-title {
      font-size: 2rem;
      margin-bottom: 0.9375rem;
      //background: rgba(255, 177, 92, 0.3);
    }
    
    &-info {
      display: flex;
      align-details: center;
      justify-content: space-between;
      margin-bottom: 0.9375rem;
    }
    
    &-text {
      line-height: 1.5rem;
    }


    &-priceInfo {
      width: 100%;
      padding: 1.5625rem;
      border: 0.125rem solid rgba(255, 177, 92, 0.6);

      &-block {
        margin-bottom: 1.25rem;

        > div:nth-child(1) {
          font-weight: bold;
          font-size: 1.125rem;
          margin-bottom: 0.3125rem;
        }
      }
    }
  }
`;