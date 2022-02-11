import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useCheckBox } from '@hooks';
import theme from '@styles/theme';
import convertDay from '@utils/convertDay';

const DaySelect = ({ valueList, initialCheckeds, onChange, ...props }) => {
  const { checkedList, handleCheckedAll, handleCheckedElement } = useCheckBox({
    name: 'uploadDate',
    initialCheckeds,
    valueList,
    onChange,
  });

  return (
    <div {...props}>
      <label htmlFor="all">
        <StyledInput
          type="checkbox"
          id="all"
          onChange={handleCheckedAll}
          checked={checkedList.length === valueList.length}
        />
        <StyledButton>전체</StyledButton>
      </label>
      {convertDay(valueList).map(value => (
        <label key={value} htmlFor={value}>
          <StyledInput
            id={value}
            type="checkbox"
            value={value}
            onChange={handleCheckedElement}
            checked={
              checkedList.length === valueList.length
                ? false
                : checkedList.includes(value)
            }
          />
          <StyledButton>{value}</StyledButton>
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

DaySelect.defaultProps = {
  initialCheckeds: [],
  onChange: () => {},
};

DaySelect.propTypes = {
  valueList: PropTypes.array.isRequired,
  initialCheckeds: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
};

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
