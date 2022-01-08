import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Card } from '@components';

const CardList = ({ list, ...props }) => (
  <CardContainer hasContent={list.length} {...props}>
    {list.length ? (
      list.map(item => <Card key={item.seriesId} data={item} {...props} />)
    ) : (
      <p>데이터가 존재하지 않습니다</p>
    )}
  </CardContainer>
);

CardList.defaultProps = {
  list: [],
};

CardList.propTypes = {
  list: PropTypes.array,
};

export default CardList;

const CardContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 20vh;
  display: flex;
  justify-content: ${({ hasContent }) =>
    hasContent ? 'flex-start' : 'center'};
  align-items: center;
  flex-flow: row wrap;
`;
