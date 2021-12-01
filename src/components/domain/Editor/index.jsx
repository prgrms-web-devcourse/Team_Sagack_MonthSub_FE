import React from 'react';
import { Input, TextArea } from '@components';
import styled from '@emotion/styled';

const Editor = () => (
  <StyledSection>
    <Input width="100%" value="" />
    <TextArea width="100%" />
  </StyledSection>
);

export default Editor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;
