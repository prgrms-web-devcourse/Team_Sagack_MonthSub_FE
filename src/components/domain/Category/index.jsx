import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Category = ({ categoryList, onClick }) => (
  <CategoryContainer>
    {categoryList.map(item => (
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

Category.defaultProps = {
  categoryList: [],
  onClick: () => {},
};

Category.propTypes = {
  categoryList: PropTypes.array,
  onClick: PropTypes.func,
};

export default Category;

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
