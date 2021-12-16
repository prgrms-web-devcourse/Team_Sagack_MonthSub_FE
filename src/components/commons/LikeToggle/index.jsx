import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icons, IconWrapper } from '@components';
import { useToggle } from '@hooks';

export const LikeToggle = ({ seriesId, isLiked }) => {
  const [state, toggle] = useToggle();

  useEffect(() => {
    isLiked && toggle();
  }, []);

  const addLike = async () => {
    console.log('좋아요 추가 api호출', seriesId);
  };

  const cancleLike = async () => {
    console.log('좋아요 취소 api호출', seriesId);
  };

  const handleClick = () => {
    toggle();
    state ? cancleLike() : addLike();
  };

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
  isLiked: false,
};
LikeToggle.propTypes = {
  seriesId: PropTypes.number,
  isLiked: PropTypes.bool,
};

export default LikeToggle;
