import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, Title } from '@atom';
import { Flex } from '@templates';

const PeriodInput = ({
  title,
  startName,
  startValue,
  startMin,
  endName,
  endValue,
  endMin,
  onChange,
  disabled,
}) => (
  <Container>
    <Title size="medium">{title}</Title>
    <Flex horizen justifyContent="space-between">
      <Input
        width="100%"
        type="date"
        value={startValue}
        name={startName}
        onChange={onChange}
        disabled={disabled}
        min={startMin || ''}
      />
      <Line>⎻</Line>
      <Input
        width="100%"
        type="date"
        value={endValue}
        name={endName}
        onChange={onChange}
        disabled={disabled}
        min={endMin || ''}
      />
    </Flex>
  </Container>
);

PeriodInput.defaultProps = {
  onChange: () => {},
  title: '',
  startName: '',
  startValue: '',
  startMin: '',
  endName: '',
  endValue: '',
  endMin: '',
  disabled: false,
};

PeriodInput.propTypes = {
  title: PropTypes.string,
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
  width: 5rem;
`;

const Container = styled.div``;
