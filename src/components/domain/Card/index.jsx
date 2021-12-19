import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import convertCategory from '@utils/convertCategory';
import { LikeToggle, Image } from '@components';
import theme from '@styles/theme';

const Card = ({ data, ...props }) => (
  <Container {...props}>
    <CardImageArea>
      <Link to={`/series/${data.seriesId}`}>
        <Image
          src={data.thumbnail}
          width="100%"
          height="100%"
          alt={`cardThumb-${data.seriesId}`}
        />
      </Link>
      <div>
        {data.subscribeStatus === 'SUBSCRIPTION_AVAILABLE' ? (
          <CardStatusTag color={theme.color.main}>
            <div className="available">모집중</div>
          </CardStatusTag>
        ) : (
          <CardStatusTag color="#ff6d94">
            <div className="unAvailable">연재중</div>
          </CardStatusTag>
        )}
      </div>
    </CardImageArea>
    <CardTextArea>
      <TextHeader>
        <div>
          <StyledInfo>{convertCategory(data.category)}</StyledInfo>
        </div>
      </TextHeader>
      <Link to={`/series/${data.seriesId}`}>
        <TextMain>
          <div className="title">{data.title}</div>
          <div className="intro">{data.introduceSentence}</div>
          <div className="date">
            {data.subscribeStatus === 'SUBSCRIPTION_AVAILABLE'
              ? `모집일: ${data.subscribeStartDate} ~ ${data.subscribeEndDate}`
              : `연재일: ${data.seriesStartDate} ~ ${data.seriesEndDate}`}
          </div>
        </TextMain>
      </Link>
      <TextBottom>
        <div>
          <Link to={`/channel/${data.userId}`}>{data.nickname}</Link>
        </div>
        <div>
          <LikeToggle
            id={data.seriesId}
            likeCount={data.likes}
            isLiked={data.likeStatus}
          />
        </div>
      </TextBottom>
    </CardTextArea>
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

const margin = '1.25rem';
const contentsMaxCount = 4;
const Container = styled.div`
  width: calc(
    (100% - (${margin} * ${contentsMaxCount - 1})) / ${contentsMaxCount}
  );
  margin-right: ${margin};
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.2rem 0.625rem 0 rgba(50, 50, 93, 0.2);
  // border: 1px solid #ccd3e2;

  &:nth-of-type(-n + 4) {
    margin-top: 0;
  }

  &:nth-of-type(${contentsMaxCount}n) {
    margin-right: 0;
  }
`;

const CardImageArea = styled.div`
  height: 11rem;
  background-color: ${theme.color.grey};
  position: relative;
`;

const CardStatusTag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ color }) => color};
  height: 25px;
  padding: 0 10px;
  border-radius: 30px;
  font-size: 13px;
  color: #000000;
  margin: 5px;
`;

const CardTextArea = styled.div`
  background-color: #ffffff;
  > div {
    padding: 15px 20px;
  }
`;
const TextHeader = styled.div`
  display: flex;
  align-items: center;
`;
const TextMain = styled.div`
  padding: 15px 20px;

  .title {
    font-size: ${theme.font.medium};
    font-weight: bold;
    max-height: 2rem;
    padding-right: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .intro {
    line-height: 1rem;
    height: 2.2rem;
    max-height: 2.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .date {
  }

  > div {
    margin-bottom: 15px;
    font-size: ${theme.font.small};
  }
`;
const TextBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccd3e2;
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.color.sub};
  color: #ffffff;
  height: 25px;
  padding: 0 10px;
  border-radius: 30px;
  font-size: 13px;
  margin-right: 10px;
`;
