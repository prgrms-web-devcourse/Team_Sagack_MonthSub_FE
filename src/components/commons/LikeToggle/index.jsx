import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icons, IconWrapper } from '@components';
import { useToggle } from '@hooks';

const LikeSeriesIdList = [2, 3, 4, 5, 6, 7];

export const LikeToggle = ({ seriesId }) => {
  const [state, toggle] = useToggle();

  useEffect(() => {
    // 전역 상태 가져오기
    LikeSeriesIdList.includes(seriesId) && toggle();
  }, []);

  const addLike = () => {
    console.log('좋아요');
    // 전역상태에서 seriesId추가
    // 좋아요 추가 api호출
  };

  const cancleLike = () => {
    console.log('좋아요 취소');
    // 전역상태에서 seriesId제거
    // 좋아요 취소 api호출
  };

  const handleClick = () => {
    state ? cancleLike() : addLike();
    toggle();
  };

  console.log(state);

  return (
    <div onClick={handleClick}>
      <IconWrapper color="red">
        {state ? <Icons.Like /> : <Icons.LikeBorder />}
      </IconWrapper>
    </div>
  );
};

LikeToggle.defaultProps = {
  seriesId: 2,
};
LikeToggle.propTypes = {
  seriesId: PropTypes.number,
};

export default LikeToggle;
