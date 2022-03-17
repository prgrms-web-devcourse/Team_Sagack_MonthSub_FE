import React, { FormEventHandler } from 'react';
import { TextArea, SectionTitle } from '@atom';
import styled from '@emotion/styled';
import type { ReactElement, FormEvent } from 'react';
import type { SeriesFormValueType } from '@types';

interface SeriesEditorProps {
  value: SeriesFormValueType;
  onChange?: (e: FormEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  title?: string;
}

const SeriesEditor = ({
  value,
  onChange,
  disabled,
  title,
  ...props
}: SeriesEditorProps): ReactElement => {
  const handleInputChange: FormEventHandler<HTMLTextAreaElement> = e => {
    onChange && onChange(e);
  };
  return (
    <>
      <SectionTitle size="medium">{title}</SectionTitle>
      <StyledSection {...props}>
        <StyledTextArea
          width="100%"
          height="3.3rem"
          name="title"
          value={value.title || ''}
          onInput={handleInputChange}
          disabled={disabled && disabled}
          placeholder="제목"
          maxLength={300}
        />
        <StyledTextArea
          width="100%"
          height="7rem"
          name="introduceSentence"
          value={value.introduceSentence || ''}
          onInput={handleInputChange}
          disabled={disabled && disabled}
          placeholder="소개"
          maxLength={300}
        />
        <StyledTextArea
          width="100%"
          height="12rem"
          name="introduceText"
          value={value.introduceText || ''}
          onInput={handleInputChange}
          disabled={disabled && disabled}
          placeholder="설명"
          maxLength={300}
        />
      </StyledSection>
    </>
  );
};

SeriesEditor.defaultProps = {
  onChange: () => {
    return '';
  },
  disabled: false,
  title: '',
};

export default SeriesEditor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(TextArea)`
  &:nth-of-type(1) {
    margin-bottom: 0.8rem;
  }
`;
