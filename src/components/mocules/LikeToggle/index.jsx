import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, IconWrapper } from '@atom';
import { useToggle } from '@hooks';
import styled from '@emotion/styled';
import { addLikeSeries, delLikeSeries } from '@apis/like';
import theme from '@styles/theme';
import { useUser } from '@contexts/UserProvider';

export const LikeToggle = ({ id, isLiked, likeCount, onClick }) => {
  const [state, toggle] = useToggle();
  const [count, setCount] = useState(0);
  const { userInfo } = useUser();

  useEffect(() => {
    isLiked && toggle();
    setCount(likeCount);
  }, [likeCount]);

  const addLike = async () => {
    setCount(count + 1);
    await addLikeSeries(id);
  };

  const cancleLike = async () => {
    setCount(count - 1);
    await delLikeSeries(id);
  };

  const handleClick = () => {
    if (!userInfo.userId) {
      return;
    }
    toggle();
    state ? cancleLike() : addLike();
    onClick && onClick();
  };

  return (
    <Container onClick={handleClick}>
      <IconWrapper color={userInfo.userId ? theme.color.red : theme.color.gray}>
        {state ? <Icon.Like /> : <Icon.LikeBorder />}
      </IconWrapper>
      {typeof likeCount === 'boolean' ? '' : <Count>{count}</Count>}
    </Container>
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Count = styled.span`
  margin-left: 0.2rem;
`;