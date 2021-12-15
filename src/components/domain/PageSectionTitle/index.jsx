import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const PageSectionTitle = ({ text }) => <TitleWrapper>{text}</TitleWrapper>;

PageSectionTitle.defaultProps = {
  text: 'subtitle',
};

PageSectionTitle.propTypes = {
  text: PropTypes.string,
};

export default PageSectionTitle;

const TitleWrapper = styled.div`
  margin-bottom: 1.25rem;
  font-size: ${theme.font.large};
`;
