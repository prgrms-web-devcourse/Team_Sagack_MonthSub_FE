import React from 'react';
import PropTypes from 'prop-types';
import { addLikeSeries, delLikeSeries } from '@apis/like';
import { useUser } from '@contexts/UserProvider';
import { LikeToggle } from '@mocules';

export const SeriesLikeToggle = ({ id, isLiked, initialCount }) => {
  const { userInfo } = useUser();

  const handleClick = async state => {
    state ? await delLikeSeries(id) : await addLikeSeries(id);
  };

  return (
    <LikeToggle
      seriesId={id}
      isLogin={userInfo.userId}
      isLiked={isLiked}
      initialCount={initialCount}
      onClick={handleClick}
    />
  );
};

SeriesLikeToggle.defaultProps = {
  id: 1,
  isLiked: false,
  initialCount: false,
};
SeriesLikeToggle.propTypes = {
  id: PropTypes.number,
  isLiked: PropTypes.bool,
  initialCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default SeriesLikeToggle;
