import React from 'react';
import { Input, TextArea } from '@components';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SeriesEditor = ({ value, onChange, disabled, ...props }) => {
  const handleInputChange = e => {
    onChange && onChange(e);
  };
  return (
    <StyledSection {...props}>
      <StyledInput
        width="100%"
        name="title"
        value={value.title}
        onChange={handleInputChange}
        disabled={disabled && disabled}
      />
      <TextArea
        width="100%"
        height="3rem"
        name="introduceText"
        value={value.introduceText}
        onInput={handleInputChange}
        disabled={disabled && disabled}
      />
      <TextArea
        width="100%"
        height="10rem"
        name="introduceSentence"
        value={value.introduceSentence}
        onInput={handleInputChange}
        disabled={disabled && disabled}
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

const StyledInput = styled(Input)`
  margin-bottom: 0.5rem;
`;
