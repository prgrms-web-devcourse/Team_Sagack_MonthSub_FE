import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import convertCategory from '@utils/convertCategory';
import { LikeToggle, Image } from '@components';
import theme from '@styles/theme';

const Card = ({ data, ...props }) => (
  <Container {...props}>
    {data.subscribeStatus === 'SUBSCRIPTION_AVAILABLE' ? (
      <SubscribeStatusDiv>
        <div className="available">모집중</div>
      </SubscribeStatusDiv>
    ) : (
      <SubscribeStatusDiv>
        <div className="unAvailable">연재중</div>
      </SubscribeStatusDiv>
    )}
    <div className="card-imageArea">
      <Link to={`/series/${data.seriesId}`}>
        <Image
          src={data.thumbnail}
          width="100%"
          height="100%"
          alt={`cardThumb-${data.seriesId}`}
        />
      </Link>
    </div>
    <div className="card-textArea">
      <div>
        <div className="card-userId">
          <Link to={`/channel/${data.userId}`}>{data.nickname}</Link>
        </div>
        <div className="card-likes">
          <LikeToggle
            id={data.seriesId}
            likeCount={data.likes}
            isLiked={data.likeStatus}
          />
        </div>
      </div>
      <div className="card-title">
        <Link to={`/series/${data.seriesId}`}>{data.title}</Link>
      </div>
      <div>{data.introduceSentence}</div>
      <div>
        <div className="category">{convertCategory(data.category)}</div>
        <div>
          {data.subscribeStatus === 'SUBSCRIPTION_AVAILABLE'
            ? `모집마감 ~ ${data.subscribeEndDate}`
            : `연재종료 ~ ${data.seriesEndDate}`}
        </div>
      </div>
    </div>
  </Container>
);

Card.defaultProps = {
  data: {
    userId: 0,
    writerId: 0,
    seriesId: 0,
    nickname: '닉네임',
    thumbnail: '썸네일',
    title: '제목',
    introduceSentence: '소개',
    seriesStartDate: '',
    seriesEndDate: '',
    subscribeStatus: '모집중',
    subscribeStartDate: '',
    subscribeEndDate: '',
    likes: 0,
    category: 'ALL',
    likeStatus: false,
  },
};

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;

const margin = '1.875rem';
const contentsMaxCount = 4;
const Container = styled.div`
  width: calc(
    (100% - (${margin} * ${contentsMaxCount - 1})) / ${contentsMaxCount}
  );
  margin-right: ${margin};
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  position: relative;

  &:nth-of-type(-n + 4) {
    margin-top: 0;
  }

  &:nth-of-type(${contentsMaxCount}n) {
    margin-right: 0;
  }

  .card {
    &-imageArea {
      height: 11rem;
      background-color: ${theme.color.grey};
    }
    &-textArea {
      flex-grow: 1;
      font-size: ${theme.font.small};
      color: ${theme.color.greyDark};
      padding: ${theme.font.small};
      background-color: rgba(255, 177, 92, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .card-likes {
        font-size: ${theme.font.medium};
      }

      .category {
        height: 1.5625rem;
        padding: 0.625rem;
        background: #ffffff;
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        border: 0.0625rem solid ${theme.color.main};
      }

      > div {
        margin-bottom: ${theme.font.small};
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      > div:last-child {
        margin-bottom: 0;
      }

      .card-userId {
        &:hover {
          text-decoration: underline;
        }
      }

      .card-title {
        font-size: ${theme.font.medium};
        color: #000000;
        line-height: ${theme.font.large};
        flex-grow: 1;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const SubscribeStatusDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  > * {
    padding: 0.625rem;
  }
  .available {
    background-color: ${theme.color.main};
  }
  .unAvailable {
    background-color: #ff8eb2;
  }
`;
