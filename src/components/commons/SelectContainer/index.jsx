import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SelectContainer = ({ align, items, children, ...props }) => (
  <SortWrapper
    align={align}
    {...props}
  >
    {children}
  </SortWrapper>
);

SelectContainer.defaultProps = {
  align: '',
  items: '',
  children: ''
}

SelectContainer.propTypes = {
  align: PropTypes.string,
  items: PropTypes.node,
  children: PropTypes.node,
}


const SortWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.align || 'flex-end'};
  margin-bottom: 1.875rem;

  > select {
    margin-right: 0.625rem;
  }

  > select:last-child {
    margin-right: 0;
  }
`;

export default SelectContainer;