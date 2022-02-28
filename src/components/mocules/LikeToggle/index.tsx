import React, { useEffect, useState } from 'react';
import { Icon, IconWrapper } from '@atom';
import { useToggle } from '@hooks';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import type { HTMLAttributes, ReactElement } from 'react';

interface LikeToggleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  isLogin: boolean | number;
  isLiked: boolean;
  initialCount?: number;
  onClick?: (isToggle: boolean) => void;
}

export const LikeToggle = ({
  isLogin,
  isLiked,
  initialCount,
  onClick,
}: LikeToggleProps): ReactElement => {
  const [state, setState, toggle] = useToggle(isLiked);
  const [count, setCount] = useState<number | undefined>(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    setState(isLiked);
  }, [isLiked]);

  const addLike = async () => {
    count && setCount(count + 1);
    onClick && onClick(state);
  };

  const cancleLike = async () => {
    count && setCount(count - 1);
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
      <IconWrapper color={isLogin ? theme.color.red : theme.color.grey}>
        {state ? <Icon.Like /> : <Icon.LikeBorder />}
      </IconWrapper>
      {typeof initialCount === 'boolean' ? '' : <Count>{count}</Count>}
    </Container>
  );
};

LikeToggle.defaultProps = {
  initialCount: 0,
  onClick: () => '',
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
