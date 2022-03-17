import React from 'react';
import type { ReactElement } from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode | string;
  size?: string | number;
}

const SectionTitle = ({
  children,
  size,
  ...props
}: SectionTitleProps): ReactElement => (
  <Heading size={size} {...props}>
    {children}
  </Heading>
);

const Heading = styled.h3<SectionTitleProps>`
  margin-bottom: 1.8rem;
  font-weight: 700;
  font-size: ${({ size }) =>
    size === 'small'
      ? theme.font.small
      : size === 'base'
      ? theme.font.base
      : size === 'medium'
      ? theme.font.medium
      : size === 'large'
      ? theme.font.large
      : size === 'xLarge'
      ? theme.font.xLarge
      : typeof size === 'number'
      ? `${size}rem`
      : size};
  color: ${theme.color.greyDark};
`;

SectionTitle.defaultProps = {
  size: 'large',
};

export default SectionTitle;
