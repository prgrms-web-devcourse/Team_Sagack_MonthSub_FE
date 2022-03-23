import React, { useEffect, useState } from 'react';
import { TextArea, Input } from '@atom';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const ArticleEditor = ({ value, onChange, disabled, title, ...props }) => {
  const textRef = React.createRef();

  const handleInputChange = e => {
    onChange && onChange(e);
  };

  return (
    <StyledSection {...props}>
      <StyledInput
        width="100%"
        height="2rem"
        name="title"
        value={value.title || ''}
        onChange={handleInputChange}
        disabled={disabled && disabled}
        placeholder="제목을 입력해주세요"
        maxlength="300"
      />
      <Line />
      <StyledTextArea
        textRef={textRef}
        width="100%"
        height="60vh"
        name="contents"
        value={value.contents || ''}
        onInput={handleInputChange}
        disabled={disabled && disabled}
        placeholder="내용을 입력해주세요"
        maxlength="5000"
      />
    </StyledSection>
  );
};

ArticleEditor.defaultProps = {
  onChange: () => {},
  disabled: false,
  value: {},
  title: '',
};

ArticleEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default ArticleEditor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  border: none;
  font-size: ${theme.font.xLarge};
  height: 4rem;
  &:focus {
    border: none;
  }
`;

const Line = styled.div`
  height: 0.1rem;
  margin: 1rem 0;
  background-color: ${theme.color.greyLight};
`;

const StyledTextArea = styled(TextArea)`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  &[name='contents'] {
    flex-basis: 1;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;
