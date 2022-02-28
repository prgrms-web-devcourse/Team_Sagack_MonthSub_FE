import React from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import type { HTMLAttributes, ReactElement } from 'react';

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  name?: string;
  options: string[];
}

const Select = ({
  name,
  onChange,
  options,
  ...props
}: SelectProps): ReactElement => (
  <StyledSelect name={name} onChange={onChange} {...props}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </StyledSelect>
);

Select.defaultProps = {
  name: '',
};

export default Select;

const StyledSelect = styled.select`
  width: 10rem;
  height: 1.875rem;
  border: 0.0625rem solid ${theme.color.sub};
`;
