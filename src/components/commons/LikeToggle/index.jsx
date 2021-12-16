import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icons, IconWrapper } from '@components';
import { useToggle } from '@hooks';
import { addLikeSeries, delLikeSeries } from '@apis/like';
import theme from '@styles/theme';

export const LikeToggle = ({ id, isLiked, likeCount, onClick }) => {
  const [state, toggle] = useToggle();
  const [count, setCount] = useState(likeCount);

  useEffect(() => {
    isLiked && toggle();
  }, []);

  const addLike = async () => {
    setCount(count + 1);
    await addLikeSeries(id);
  };

  const cancleLike = async () => {
    setCount(count - 1);
    await delLikeSeries(id);
  };

  const handleClick = () => {
    toggle();
    state ? cancleLike() : addLike();
    onClick && onClick();
  };

  return (
    <div onClick={handleClick}>
      <IconWrapper color={theme.color.red}>
        {state ? <Icons.Like /> : <Icons.LikeBorder />}
      </IconWrapper>
      {typeof likeCount === 'boolean' ? '' : <span>{count} Likes</span>}
    </div>
  );
};

LikeToggle.defaultProps = {
  id: 1,
  isLiked: false,
  likeCount: false,
  onClick: () => {},
};
LikeToggle.propTypes = {
  id: PropTypes.number,
  isLiked: PropTypes.bool,
  onClick: PropTypes.func,
  likeCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default LikeToggle;
