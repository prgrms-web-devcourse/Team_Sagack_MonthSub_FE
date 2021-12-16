import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icons, IconWrapper } from '@components';
import { useToggle } from '@hooks';
import { addLikeSeries, delLikeSeries } from '@apis/like';
import theme from '@styles/theme';

export const LikeToggle = ({ id, isLiked }) => {
  const [state, toggle] = useToggle();

  useEffect(() => {
    isLiked && toggle();
  }, []);

  const addLike = async () => {
    await addLikeSeries(id);
  };

  const cancleLike = async () => {
    await delLikeSeries(id);
  };

  const handleClick = () => {
    toggle();
    state ? cancleLike() : addLike();
  };

  return (
    <div onClick={handleClick}>
      <IconWrapper color={theme.color.red}>
        {state ? <Icons.Like /> : <Icons.LikeBorder />}
      </IconWrapper>
    </div>
  );
};

LikeToggle.defaultProps = {
  id: 1,
  isLiked: false,
};
LikeToggle.propTypes = {
  id: PropTypes.number,
  isLiked: PropTypes.bool,
};

export default LikeToggle;
