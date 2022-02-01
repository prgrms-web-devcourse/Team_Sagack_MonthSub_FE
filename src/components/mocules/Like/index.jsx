import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, IconWrapper } from '@atom';
import { useToggle } from '@hooks';
import styled from '@emotion/styled';
import theme from '@styles/theme';

export const Like = ({ isLogin, isLiked, likeCount, onClick }) => {
  const [state, toggle] = useToggle();
  const [count, setCount] = useState(0);

  useEffect(() => {
    isLiked && toggle();
    setCount(likeCount);
  }, [likeCount, isLiked]);

  const addLike = async () => {
    setCount(count + 1);
    onClick && onClick(state);
  };

  const cancleLike = async () => {
    setCount(count - 1);
    onClick && onClick(state);
  };

  const handleClick = () => {
    if (!isLogin) {
      return;
    }
    toggle();
    state ? cancleLike() : addLike();
  };

  return (
    <Container onClick={handleClick}>
      <IconWrapper color={isLogin ? theme.color.red : theme.color.gray}>
        {state ? <Icon.Like /> : <Icon.LikeBorder />}
      </IconWrapper>
      {typeof likeCount === 'boolean' ? '' : <Count>{count}</Count>}
    </Container>
  );
};

Like.defaultProps = {
  isLiked: false,
  likeCount: false,
  onClick: () => {},
  isLogin: false,
};
Like.propTypes = {
  isLiked: PropTypes.bool,
  isLogin: PropTypes.bool,
  onClick: PropTypes.func,
  likeCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default Like;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Count = styled.span`
  margin-left: 0.2rem;
`;
