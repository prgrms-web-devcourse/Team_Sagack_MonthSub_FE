import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '@styles/theme';

const Select = ({ name, onChange, options, ...props }) => (
  <StyledSelect name={name} onChange={onChange} {...props}>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.text}
      </option>
    ))}
  </StyledSelect>
);

Select.defaultProps = {
  name: '',
  onChange: () => {},
  options: {},
};

Select.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Select;

const StyledSelect = styled.select`
  width: 10rem;
  height: 1.875rem;
  border: 0.0625rem solid ${theme.color.sub};
`;
