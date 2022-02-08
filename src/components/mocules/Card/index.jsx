import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import convertCategory from '@utils/convertCategory';
import { Image } from '@atom';
import { SeriesLikeToggle } from '@mocules';
import { theme, constants } from '@styles';

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
          <SeriesLikeToggle
            id={data.seriesId}
            initialCount={data.likes}
            isLiked={data.isLiked}
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
    isLiked: false,
  },
};

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;

const { margin, maxWidth, maxCount } = constants.card;

const Container = styled.div`
  margin-right: ${margin};
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.2rem 0.625rem 0 rgba(50, 50, 93, 0.2);
  max-width: ${maxWidth};

  @media ${theme.device.laptop} {
    width: calc((100% - (${margin} * ${maxCount.top - 1})) / ${maxCount.top});

    &:nth-of-type(-n + ${maxCount.top}) {
      margin-top: 0;
    }

    &:nth-of-type(${maxCount.top}n) {
      margin-right: 0;
    }
  }

  @media ${theme.detailedMobile.tablet} {
    width: calc((100% - (${margin} * ${maxCount.tab - 1})) / ${maxCount.tab});

    &:nth-of-type(-n + ${maxCount.tab}) {
      margin-top: 0;
    }

    &:nth-of-type(${maxCount.tab}n) {
      margin-right: 0;
    }
  }

  @media ${theme.detailedMobile.mobileL} {
    width: calc((100% - (${margin} * ${maxCount.mobL - 1})) / ${maxCount.mobL});

    &:nth-of-type(-n + ${maxCount.mobL}) {
      margin-top: 0;
    }

    &:nth-of-type(${maxCount.mobL}n) {
      margin-right: 0;
    }
  }

  @media ${theme.detailedMobile.mobileS} {
    width: calc((100% - (${margin} * ${maxCount.mobS - 1})) / ${maxCount.mobS});

    &:nth-of-type(-n + ${maxCount.mobS}) {
      margin-top: 0;
    }

    &:nth-of-type(${maxCount.mobS}n) {
      margin-right: 0;
    }
  }
`;

const CardImageArea = styled.div`
  height: 11rem;
  background-color: ${theme.color.grey};
  position: relative;

  > a > img {
    object-fit: cover;
  }
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
    max-height: 2rem;
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
