import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, Title } from '@components';

const Period = ({
  title,
  startName,
  startValue,
  startMin,
  endName,
  endValue,
  endMin,
  onChange,
  pageParam,
}) => (
  <>
    <Title style={{ display: title ? 'block' : 'none' }} name={title} />
    <Container>
      <Input
        type="date"
        value={startValue}
        name={startName}
        onChange={onChange}
        disabled={!!pageParam}
        min={startMin || ''}
      />
      <Line>-</Line>
      <Input
        type="date"
        value={endValue}
        name={endName}
        onChange={onChange}
        disabled={!!pageParam}
        min={endMin || ''}
      />
    </Container>
  </>
);

Period.defaultProps = {
  onChange: () => {},
  title: '',
  startName: '',
  startValue: '',
  startMin: '',
  endName: '',
  endValue: '',
  endMin: '',
  pageParam: '',
};

Period.propTypes = {
  title: PropTypes.string,
  startName: PropTypes.string,
  startValue: PropTypes.string,
  startMin: PropTypes.string,
  endName: PropTypes.string,
  endValue: PropTypes.string,
  endMin: PropTypes.string,
  onChange: PropTypes.func,
  pageParam: PropTypes.string,
};

export default Period;

const Line = styled.span`
  padding: 0 0.3rem;
`;

const Container = styled.div`
  display: flex;
`;
