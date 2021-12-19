import React from 'react';
import { TextArea, Input, Title } from '@components';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const ArticleEditor = ({ value, onChange, disabled, title, ...props }) => {
  const handleInputChange = e => {
    onChange && onChange(e);
  };
  return (
    <>
      <Title style={{ display: title ? 'block' : 'none' }} name={title} />
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
          width="100%"
          height="100%"
          name="contents"
          value={value.contents || ''}
          onInput={handleInputChange}
          disabled={disabled && disabled}
          placeholder="내용을 입력해주세요"
          maxlength="5000"
        />
      </StyledSection>
    </>
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
  height: 80vh;
`;

const StyledInput = styled(Input)`
  border: none;
  font-size: 3rem;
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
  font-size: 1rem;
  line-height: 1.8rem;
  font-size: 1rem;
  &[name='contents'] {
    flex-basis: 1;
  }
  &:focus {
    border: none;
  }
`;
