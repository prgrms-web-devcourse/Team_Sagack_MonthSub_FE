import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, Title } from '@components';

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
  <div>
    <Title size="medium">{title}</Title>
    <Container>
      <Input
        width="10rem"
        type="date"
        value={startValue}
        name={startName}
        onChange={onChange}
        disabled={disabled}
        min={startMin || ''}
      />
      <Line>⎻</Line>
      <Input
        width="10rem"
        type="date"
        value={endValue}
        name={endName}
        onChange={onChange}
        disabled={disabled}
        min={endMin || ''}
      />
    </Container>
  </div>
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
  width: 2rem;
`;

const Container = styled.div`
  display: flex;
`;
