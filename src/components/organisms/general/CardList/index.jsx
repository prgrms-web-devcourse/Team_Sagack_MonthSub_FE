import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { NoData, Card } from '@molecules';
import { theme, constants } from '@styles';

const CardList = ({ list, ...props }) => (
  <CardContainer hasContent={list.length} {...props}>
    {list.length ? (
      list.map(item => <Card key={item.seriesId} data={item} {...props} />)
    ) : (
      <NoData height="20vh">시리즈가 존재하지 않습니다</NoData>
    )}
  </CardContainer>
);

CardList.defaultProps = {
  list: [],
};

CardList.propTypes = {
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CardList;

const { maxWidth, margin, maxCount } = constants.card;
const CardContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;

  @media ${theme.device.laptop} {
    max-width: 100%;
  }
  @media ${theme.detailedMobile.tablet} {
    max-width: calc(
      (${maxWidth} * ${maxCount.tab}) + (${margin} * ${maxCount.tab - 1})
    );
  }
  @media ${theme.detailedMobile.mobileL} {
    max-width: calc((${maxWidth} * ${maxCount.mobL}) + ${margin});
  }
  @media ${theme.detailedMobile.mobileS} {
    max-width: ${maxWidth};
  }
`;
