import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, Title } from '@components';
import theme from '@styles/theme';

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
  <div>
    <Title style={{ display: title ? 'block' : 'none' }} name={title} />
    <Container>
      <StyledInput
        width="10rem"
        type="date"
        value={startValue}
        name={startName}
        onChange={onChange}
        disabled={!!pageParam}
        min={startMin || ''}
      />
      <Line>⎻</Line>
      <StyledInput
        width="10rem"
        type="date"
        value={endValue}
        name={endName}
        onChange={onChange}
        disabled={!!pageParam}
        min={endMin || ''}
      />
    </Container>
  </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
`;

const Container = styled.div`
  display: flex;
`;

const StyledInput = styled(Input)`
  /* border: 0.05rem solid ${theme.color.grey}; */
  border: 0.05rem solid ${theme.color.grey};
`;
