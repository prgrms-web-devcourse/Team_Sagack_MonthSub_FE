import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const SectionContainer = ({ title, children, titleItem }) => (
  <>
    <StyledTitle>
      {title}
      {titleItem}
    </StyledTitle>
    <StyledContainer>{children}</StyledContainer>
  </>
);

SectionContainer.defaultProps = {
  title: '',
  titleItem: null,
  children: '',
};

SectionContainer.propTypes = {
  title: PropTypes.string,
  titleItem: PropTypes.node,
  children: PropTypes.node,
};

export default SectionContainer;

const StyledContainer = styled.div`
  margin-bottom: 80px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledTitle = styled.div`
  font-size: ${theme.font.large};
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.25rem;
`;
