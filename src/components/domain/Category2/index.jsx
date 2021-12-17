import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Category2 = ({ keyAndValues, onClick }) => (
  <CategoryContainer>
    {keyAndValues.map(item => (
      <StyledButton
        type="button"
        key={item.key}
        id={item.key}
        onClick={onClick}
      >
        {item.value}
      </StyledButton>
    ))}
  </CategoryContainer>
);

Category2.defaultProps = {
  keyAndValues: [],
  onClick: () => {},
};

Category2.propTypes = {
  keyAndValues: PropTypes.array,
  onClick: PropTypes.func,
};

export default Category2;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.25rem;
`;

const StyledButton = styled.button`
  padding: 1.25rem;
  margin-right: 1.5rem;
`;
