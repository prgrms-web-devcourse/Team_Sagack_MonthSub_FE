import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const DropListSelect = ({ name, onChange, options, ...props }) => (
  <StyledDropListSelect name={name} onChange={onChange} {...props}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </StyledDropListSelect>
);

DropListSelect.defaultProps = {
  name: '',
  onChange: () => {},
  options: [],
};

DropListSelect.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default DropListSelect;

const StyledDropListSelect = styled.select`
  width: 10rem;
  height: 1.875rem;
  border: 0.0625rem solid ${theme.color.sub};
`;
