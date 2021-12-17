import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Card } from '@components';

const CardList = ({ list, ...props }) => (
  <CardContainer {...props}>
    {list.map(item => (
      <Card key={item.seriesId} data={item} {...props} />
    ))}
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
  display: flex;
  flex-flow: row wrap;
`;
