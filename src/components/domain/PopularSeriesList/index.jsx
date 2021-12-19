import React from 'react';
import styled from '@emotion/styled';
import { ImageCard } from '@components';
import PropTypes from 'prop-types';

const PopularSeriesList = ({ list }) => (
  <PopularSeriesContainer>
    {list.map(({ nickname, title, introduceSentence, thumbnail, seriesId }) => (
      <ImageCard
        id={seriesId}
        key={seriesId}
        src={thumbnail}
        nickname={nickname}
        title={title}
        introduceSentence={introduceSentence}
      />
    ))}
  </PopularSeriesContainer>
);

PopularSeriesList.defaultProps = {
  list: [],
};

PopularSeriesList.propTypes = {
  list: PropTypes.array,
};

export default PopularSeriesList;

const PopularSeriesContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  padding-top: 5rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border: 1px solid red;
`;
