import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import theme from '@styles/theme';

const HottestCard = ({ data, ...props }) => (
  <CardContainer {...props}>
    <Link to={`/series/${data.seriesId}`}>
      <HottestImage src={data.thumbnail} alt="cardThumb" />
      <HottestInfo>
        <div className="title">{data.title}</div>
        <div className="text">{data.introduceSentence}</div>
        <div className="nickname">by {data.nickname}</div>
      </HottestInfo>
    </Link>
  </CardContainer>
);

HottestCard.defaultProps = {
  data: {},
};

HottestCard.propTypes = {
  data: PropTypes.object,
};

export default HottestCard;

const CardContainer = styled.div`
  width: 20%;
  height: 30rem;
  position: relative;
`;

const HottestImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(100%);
  }
`;

const HottestInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  padding: 30px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.color.greyMedium};

  .title {
    font-size: ${theme.font.large};
    margin-bottom: 10px;
    color: #ffffff;
  }

  .text {
    line-height: 1.5rem;
  }

  .nickname {
    margin-top: 30px;
  }
`;
