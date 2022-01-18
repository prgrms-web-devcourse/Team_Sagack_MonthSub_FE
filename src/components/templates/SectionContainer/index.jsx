import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Title } from '@atom';

const SectionContainer = ({ title, children, titleItem }) => (
  <>
    <Title extraItem={titleItem} color="#000000">
      {title}
    </Title>
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