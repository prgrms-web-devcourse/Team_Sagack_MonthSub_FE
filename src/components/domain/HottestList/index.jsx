import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { HottestCard } from '@components';
import theme from '@styles/theme';

const HottestList = ({ list, ...props }) => (
  <ListCardContainer {...props}>
    {list.map(item => (
      <HottestCard key={item.seriesId} data={item} {...props} />
    ))}
  </ListCardContainer>
);

HottestList.defaultProps = {
  list: [],
};

HottestList.propTypes = {
  list: PropTypes.array,
};

export default HottestList;

const ListCardContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  margin-top: ${theme.common.navHeight};
`;
