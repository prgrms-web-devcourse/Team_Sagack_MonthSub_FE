import React from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import type { HTMLAttributes, ReactElement } from 'react';

interface NoDataProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | string;
  height?: string | number;
  backgroundColor?: string;
}

const NoData = ({
  children,
  height,
  backgroundColor,
}: NoDataProps): ReactElement => (
  <Container height={height} backgroundColor={backgroundColor}>
    <p>{children}</p>
  </Container>
);

NoData.defaultProps = {
  children: '데이터가 없습니다.',
  height: '10rem',
  backgroundColor: theme.color.grey,
};

export default NoData;

const Container = styled.div<NoDataProps>`
  width: 100%;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.greyDark};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 1.25rem;
`;
