import React from 'react';
import styled from '@emotion/styled';
import { List, Button } from '@components';

const Category = () => (
  <div>
    <List horizen justifyContent="center">
      <StyledButton circle>Category1</StyledButton>
      <StyledButton circle>Category1</StyledButton>
      <StyledButton circle>Category1</StyledButton>
      <StyledButton circle>Category1</StyledButton>
      <StyledButton circle>Category1</StyledButton>
      <StyledButton circle>Category1</StyledButton>
      <StyledButton circle>Category1</StyledButton>
    </List>
  </div>
);

export default Category;

Category.defaultProps = {};

Category.propTypes = {};

const StyledButton = styled(Button)`
  margin: 0 10px;
`;
