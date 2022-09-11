import React from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import convertDay from '@utils/convertDay';
import type { InputHTMLAttributes, ReactElement } from 'react';

interface DaySelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  valueList: string[];
  initialCheckeds: string[];
  onChange: {
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxAll: (
      e: React.ChangeEvent<HTMLInputElement>,
      allValues: string[],
    ) => void;
  };
}

const DaySelect = ({
  valueList,
  initialCheckeds,
  onChange,
  ...props
}: DaySelectProps): ReactElement => {
  return (
    <div {...props}>
      <label htmlFor="all">
        <StyledInput
          id="all"
          type="checkbox"
          name="uploadDate"
          onChange={e => {
            onChange.handleCheckboxAll(e, valueList);
          }}
          checked={initialCheckeds.length === valueList.length}
        />
        <StyledButton>전체</StyledButton>
      </label>
      {valueList.map(value => (
        <label key={value} htmlFor={value}>
          <StyledInput
            id={value}
            type="checkbox"
            name="uploadDate"
            value={value}
            onChange={onChange.handleCheckbox}
            checked={initialCheckeds.includes(value)}
          />
          <StyledButton>{convertDay([value])}</StyledButton>
        </label>
      ))}
    </div>
  );
};

const StyledInput = styled.input`
  display: none;
  &:checked + div {
    background-color: ${theme.color.main};
    color: #fff;
  }
`;

export default DaySelect;

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
