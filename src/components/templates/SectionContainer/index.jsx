import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { SectionTitle } from '@atom';

const SectionContainer = ({ title, children, ...props }) => (
  <Section {...props}>
    <SectionTitle>{title}</SectionTitle>
    <div>{children}</div>
  </Section>
);

SectionContainer.defaultProps = {
  title: '',
  children: '',
};

SectionContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SectionContainer;

const Section = styled.section`
  margin-bottom: 80px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
