import React from 'react';
import { TextArea, Title } from '@components';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SeriesEditor = ({ value, onChange, disabled, title, ...props }) => {
  const handleInputChange = e => {
    onChange && onChange(e);
  };
  return (
    <>
      <Title style={{ display: title ? 'block' : 'none' }} name={title} />
      <StyledSection {...props}>
        <StyledTextArea
          width="100%"
          height="2rem"
          name="title"
          value={value.title || ''}
          onInput={handleInputChange}
          disabled={disabled && disabled}
          placeholder="제목"
          maxlength="300"
        />
        <StyledTextArea
          width="100%"
          height="3rem"
          name="introduceText"
          value={value.introduceText || ''}
          onInput={handleInputChange}
          disabled={disabled && disabled}
          placeholder="소개"
          maxlength="300"
        />
        <StyledTextArea
          width="100%"
          height="10rem"
          name="introduceSentence"
          value={value.introduceSentence || ''}
          onInput={handleInputChange}
          disabled={disabled && disabled}
          placeholder="설명"
          maxlength="5000"
        />
      </StyledSection>
    </>
  );
};

SeriesEditor.defaultProps = {
  onChange: () => {},
  disabled: false,
  title: '',
};

SeriesEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default SeriesEditor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(TextArea)`
  margin-bottom: 0.5rem;
`;
