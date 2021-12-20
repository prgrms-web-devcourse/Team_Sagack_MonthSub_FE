import React from 'react';
import { IconWrapper, Icons } from '@components';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import PropTypes from 'prop-types';

const AddButton = ({ children }) => (
  <Container>
    <IconWrapper color={theme.color.main} fontSize="2rem">
      <Icons.AddCircle />
    </IconWrapper>
    <Text>{children}</Text>
  </Container>
);

AddButton.defaultProps = {
  children: '',
};

AddButton.propTypes = {
  children: PropTypes.string,
};

export default AddButton;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span:hover {
    color: ${theme.color.main};
    transition: all 200ms ease-out;
  }
`;

const Text = styled.span`
  margin-left: 0.3rem;
`;
