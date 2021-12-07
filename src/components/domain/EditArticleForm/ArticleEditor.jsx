import React from 'react';
import { TextArea, Input } from '@components';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ArticleEditor = ({ value, onChange, disabled, ...props }) => {
  const handleInputChange = e => {
    onChange && onChange(e);
  };
  return (
    <StyledSection {...props}>
      <StyledInput
        width="100%"
        height="2rem"
        name="title"
        value={value.title}
        onChange={handleInputChange}
        disabled={disabled && disabled}
        placeholder="제목"
        maxlength="300"
      />
      <StyledTextArea
        width="100%"
        height="100%"
        name="content"
        value={value.content}
        onInput={handleInputChange}
        disabled={disabled && disabled}
        placeholder="내용"
        maxlength="5000"
      />
    </StyledSection>
  );
};

ArticleEditor.defaultProps = {
  onChange: () => {},
  disabled: false,
};

ArticleEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArticleEditor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

const StyledInput = styled(Input)`
  border: 0.016rem solid #949494;
  box-shadow: none;
  &:focus {
    box-shadow: none;
    border: 0.016rem solid #949494;
  }
`;

const StyledTextArea = styled(TextArea)`
  border: 0.016rem solid #949494;
  margin-bottom: 0.5rem;
  outline: none;
  &[name='content'] {
    flex-basis: 1;
  }
`;
