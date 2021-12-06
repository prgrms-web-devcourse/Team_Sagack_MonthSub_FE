import React from 'react';
import { TextArea } from '@components';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SeriesEditor = ({ value, onChange, disabled, ...props }) => {
  const handleInputChange = e => {
    onChange && onChange(e);
  };
  return (
    <StyledSection {...props}>
      <StyledTextArea
        width="100%"
        height="2rem"
        name="title"
        value={value.title || ''}
        onInput={handleInputChange}
        disabled={disabled && disabled}
        placeholder="제목"
      />
      <StyledTextArea
        width="100%"
        height="3rem"
        name="introduceText"
        value={value.introduceText || ''}
        onInput={handleInputChange}
        disabled={disabled && disabled}
        placeholder="소개"
      />
      <StyledTextArea
        width="100%"
        height="10rem"
        name="introduceSentence"
        value={value.introduceSentence || ''}
        onInput={handleInputChange}
        disabled={disabled && disabled}
        placeholder="설명"
      />
    </StyledSection>
  );
};

SeriesEditor.defaultProps = {
  onChange: () => {},
  disabled: false,
};

SeriesEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SeriesEditor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(TextArea)`
  margin-bottom: 0.5rem;
`;
