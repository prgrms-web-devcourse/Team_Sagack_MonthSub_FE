// onClick에 api호출 함수 담아서 전달  await addLikeSeries(id); await delLikeSeries(id);
// userInfo 호출해서 로그인 유무 값 전달
import React from 'react';
import PropTypes from 'prop-types';
import { addLikeSeries, delLikeSeries } from '@apis/like';
import { useUser } from '@contexts/UserProvider';
import { Like } from '@mocules';

export const LikeWrapped = ({ id, isLiked, likeCount }) => {
  const { userInfo } = useUser();

  const handleClick = async state => {
    state ? await delLikeSeries(id) : await addLikeSeries(id);
  };

  return (
    <Like
      seriesId={id}
      isLogin={userInfo.userId}
      isLiked={isLiked}
      likeCount={likeCount}
      onClick={handleClick}
    />
  );
};

LikeWrapped.defaultProps = {
  id: 1,
  isLiked: false,
  likeCount: false,
};
LikeWrapped.propTypes = {
  id: PropTypes.number,
  isLiked: PropTypes.bool,
  likeCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default LikeWrapped;
