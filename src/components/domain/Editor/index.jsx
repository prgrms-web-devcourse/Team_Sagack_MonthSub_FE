import React from 'react';
import { Input, TextArea } from '@components';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Editor = ({ value, onChange, ...props }) => {
  const handleInputChange = () => {
    onChange && onChange();
  };
  return (
    <StyledSection {...props}>
      <StyledInput
        width="100%"
        name="title"
        value={value}
        onChange={handleInputChange}
      />
      <TextArea
        width="100%"
        height="10rem"
        name="description"
        value={value}
        onChange={handleInputChange}
      />
    </StyledSection>
  );
};

Editor.defaultProps = {
  onChange: () => {},
};

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Editor;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-bottom: 0.5rem;
`;
