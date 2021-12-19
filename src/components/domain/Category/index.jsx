import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '@styles/theme';

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
  height: 40px;
  border-radius: 40px;
  padding: 0 1.5rem;
  margin-right: 1.5rem;
  background-color: #ffffff;
  box-shadow: ${theme.style.boxShadow};
`;
