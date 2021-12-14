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

Category.defaultProps = {};

Category.propTypes = {};

export default Category;

const StyledButton = styled(Button)`
  margin: 0 10px;
`;
