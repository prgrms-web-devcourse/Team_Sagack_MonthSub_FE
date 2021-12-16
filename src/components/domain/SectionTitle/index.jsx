import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const SectionTitle = ({ children, ...props }) => (
  <StyledTitle {...props}>{children}</StyledTitle>
);

SectionTitle.defaultProps = {
  children: 'title',
};

SectionTitle.propTypes = {
  children: PropTypes.node,
};

export default SectionTitle;

const StyledTitle = styled.div`
  font-size: ${theme.font.large};
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.25rem;
`;
