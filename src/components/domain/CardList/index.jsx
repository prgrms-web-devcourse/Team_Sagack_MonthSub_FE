import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import convertCategory from '@utils/convertCategory';
import { Icons, Image } from '@components';

const CardList = ({ list, ...props }) => (
  <CardContainer {...props}>
    {list.map(item => (
      <Card key={item.seriesId}>
        {item.subscribeStatus === 'SUBSCRIPTION_AVAILABLE' ? (
          <SubscribeStatusDiv>
            <div className="available">모집중</div>
          </SubscribeStatusDiv>
        ) : (
          <SubscribeStatusDiv>
            <div className="unAvailable">연재중</div>
          </SubscribeStatusDiv>
        )}
        <div className="card-imageArea">
          <Link to={`/series/${item.seriesId}`}>
            <Image
              src={item.thumbnail}
              width="100%"
              height="100%"
              alt={`cardThumb-${item.seriesId}`}
            />
          </Link>
        </div>
        <div className="card-textArea">
          <div>
            <div className="card-userId">
              <Link to={`/channel/${item.userId}`}>{item.nickname}</Link>
            </div>
            <div className="card-likes">
              <Icons.Like />
              {item.likes} Likes
            </div>
          </div>
          <div className="card-title">
            <Link to={`/series/${item.seriesId}`}>{item.title}</Link>
          </div>
          <div>{item.introduceSentence}</div>
          <div>
            <div className="category">{convertCategory(item.category)}</div>
            <div>
              {item.subscribeStatus === 'SUBSCRIPTION_AVAILABLE'
                ? `모집마감 ~ ${item.subscribeEndDate}`
                : `연재종료 ~ ${item.seriesEndDate}`}
            </div>
          </div>
        </div>
      </Card>
    ))}
  </CardContainer>
);

CardList.defaultProps = {
  list: [],
};

CardList.propTypes = {
  list: PropTypes.array,
};

export default CardList;

const CardContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
`;

const margin = '1.875rem';
const contentsMaxCount = 4;
const Card = styled.div`
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
      background-color: #bdbdbd;
    }
    &-textArea {
      flex-grow: 1;
      font-size: 0.875rem;
      color: #4b4b4b;
      padding: 0.875rem;
      background-color: rgba(255, 177, 92, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .card-likes {
        font-size: 1.125rem;
      }

      .category {
        height: 1.5625rem;
        padding: 0.625rem;
        background: #ffffff;
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        border: 0.0625rem solid #ffb15c;
      }

      > div {
        margin-bottom: 0.875rem;
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
        font-size: 1.125rem;
        color: #000000;
        line-height: 1.5rem;
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
    background-color: #ffb15c;
  }
  .unAvailable {
    background-color: #ff8eb2;
  }
`;
