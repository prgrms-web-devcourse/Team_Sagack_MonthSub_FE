import React from 'react';
import {
  Wrapper,
  ConfirmCancleButtons,
  ArticleEditor,
  Upload,
} from '@components';
import styled from '@emotion/styled';

const WriteArticlePage = () => (
  <Wrapper>
    <Form>
      <ArticleEditor />
      <Upload>
        <button type="button">Click me</button>
      </Upload>
      <Buttons confirmName="제출" />
    </Form>
  </Wrapper>
);
export default WriteArticlePage;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
`;

const Buttons = styled(ConfirmCancleButtons)`
  margin-top: 2rem;
`;
