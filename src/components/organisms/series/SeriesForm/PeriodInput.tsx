import React from 'react';
import styled from '@emotion/styled';
import { Input } from '@atom';
import { Flex } from '@templates';
import type { InputHTMLAttributes, ReactElement } from 'react';

interface PeriodInputProps extends InputHTMLAttributes<HTMLInputElement> {
  startName?: string;
  startValue?: string;
  startMin?: string;
  endName?: string;
  endValue?: string;
  endMin?: string;
}

const PeriodInput = ({
  startName,
  startValue,
  startMin,
  endName,
  endValue,
  endMin,
  onChange,
  disabled,
}: PeriodInputProps): ReactElement => (
  <Flex horizen justifyContent="space-between">
    <StyledInput
      width="0"
      type="date"
      value={startValue}
      name={startName}
      onChange={onChange}
      disabled={disabled}
      min={startMin || ''}
    />
    <Line>⎻</Line>
    <StyledInput
      width="0"
      type="date"
      value={endValue}
      name={endName}
      onChange={onChange}
      disabled={disabled}
      min={endMin || ''}
    />
  </Flex>
);

PeriodInput.defaultProps = {
  startName: '',
  startValue: '',
  startMin: '',
  endName: '',
  endValue: '',
  endMin: '',
};

export default PeriodInput;

const Line = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6%;
`;

const StyledInput = styled(Input)`
  min-width: 47%;
`;
