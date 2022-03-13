import React from 'react';
import styled from '@emotion/styled';
import type {
  HTMLAttributes,
  ReactElement,
  ReactChildren,
  ReactChild,
} from 'react';

interface FlexProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  width?: string | number;
  height?: string | number;
  horizen?: boolean;
  justifyContent?: string;
  alignItems?: string;
}

const Flex = ({
  children,
  width,
  height,
  horizen,
  justifyContent,
  alignItems,
  ...props
}: FlexProps): ReactElement => (
  <StyledFlex
    width={width}
    height={height}
    horizen={horizen}
    justifyContent={justifyContent}
    alignItems={alignItems}
    {...props}
  >
    {children}
  </StyledFlex>
);

Flex.defaultProps = {
  width: '100%',
  height: '100%',
  horizen: false,
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export default Flex;

const StyledFlex = styled.ul<FlexProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  display: flex;
  flex-direction: ${({ horizen }) => (horizen ? 'row' : 'column')};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;
