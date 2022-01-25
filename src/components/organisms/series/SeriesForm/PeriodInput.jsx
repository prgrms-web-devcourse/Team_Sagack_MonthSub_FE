import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input } from '@atom';
import { Flex } from '@templates';

const PeriodInput = ({
  startName,
  startValue,
  startMin,
  endName,
  endValue,
  endMin,
  onChange,
  disabled,
}) => (
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
  onChange: () => {},
  startName: '',
  startValue: '',
  startMin: '',
  endName: '',
  endValue: '',
  endMin: '',
  disabled: false,
};

PeriodInput.propTypes = {
  startName: PropTypes.string,
  startValue: PropTypes.string,
  startMin: PropTypes.string,
  endName: PropTypes.string,
  endValue: PropTypes.string,
  endMin: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
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
