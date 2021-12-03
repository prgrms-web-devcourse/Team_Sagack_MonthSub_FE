import React from 'react';
import { Input, TextArea } from '@components';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SeriesEditor = ({ value, onChange, ...props }) => {
  const handleInputChange = e => {
    onChange && onChange(e);
  };
  return (
    <StyledSection {...props}>
      <StyledInput
        width="100%"
        name="title"
        // value={value}
        onChange={handleInputChange}
      />
      <TextArea
        width="100%"
        height="3rem"
        name="introduceText"
        // value={value}
        onInput={handleInputChange}
      />
      <TextArea
        width="100%"
        height="10rem"
        name="introduceSentence"
        // value={value}
        onInput={handleInputChange}
      />
    </StyledSection>
  );
};

SeriesEditor.defaultProps = {
  onChange: () => {},
};

SeriesEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default SeriesEditor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-bottom: 0.5rem;
`;
