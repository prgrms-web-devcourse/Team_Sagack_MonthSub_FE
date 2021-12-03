import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const PageSectionTitle = ({ text }) => (
  <TitleWrapper>
    { text }
  </TitleWrapper>
);

PageSectionTitle.defaultProps = {
  text: 'subtitle',
}

PageSectionTitle.propTypes = {
  text: PropTypes.string,
}

export default PageSectionTitle;

const TitleWrapper = styled.div`
  margin-bottom: 0.625rem;
  font-size: 1.5rem;
`;