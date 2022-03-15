import React from 'react';
import styled from '@emotion/styled';
import { Input } from '@atom';
import theme from '@styles/theme';
import convertCategory from '@utils/convertCategory';
import type { InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';

interface CategorySelectProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  labels?: string[];
  disabled?: boolean;
  checkedItem?: string;
}

const CategorySelect = ({
  name,
  labels,
  onChange,
  disabled,
  checkedItem,
  ...props
}: CategorySelectProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <div {...props}>
      {labels &&
        labels.map(label => (
          <label key={label} htmlFor={label}>
            <StyledInput
              type="radio"
              name={name}
              id={label}
              onChange={handleChange}
              value={label}
              checked={checkedItem === label}
              disabled={disabled}
            />
            <StyledButton>{convertCategory(label)}</StyledButton>
          </label>
        ))}
    </div>
  );
};

CategorySelect.defaultProps = {
  name: '',
  labels: [],
  checkedItem: '',
  disabled: false,
};

export default CategorySelect;

const StyledInput = styled(Input)`
  display: none;
  &:checked + div {
    background-color: ${theme.color.main};
    color: #fff;
  }
`;

const StyledButton = styled.div`
  display: inline-block;
  width: 6.25rem;
  padding: 0.5rem;
  cursor: pointer;
  user-select: none;
  border-radius: 50px;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  color: ${theme.color.main};
  background-color: #fff;
  box-shadow: ${theme.style.boxShadow};
  text-align: center;
  &:hover {
    color: #fff;
    background-color: ${theme.color.main};
    transition: all 200ms ease-out;
  }
`;
