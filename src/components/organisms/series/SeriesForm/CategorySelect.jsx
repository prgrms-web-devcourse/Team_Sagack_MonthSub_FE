import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input } from '@atom';
import { Flex } from '@templates';
import theme from '@styles/theme';

const CategorySelect = ({
  name,
  labels,
  onChange,
  disabled,
  checkedItem,
  ...props
}) => {
  const handleChange = e => {
    onChange && onChange(e);
  };

  return (
    <div {...props}>
      <StyledFlex horizen justifyContent="flex-start">
        {labels.map(label => (
          <label key={label} htmlFor={label}>
            <StyledInput
              type="radio"
              name={name}
              id={label}
              onChange={handleChange}
              value={label}
              checked={checkedItem.includes(label)}
              disabled={disabled}
            />
            <StyledButton>{label}</StyledButton>
          </label>
        ))}
      </StyledFlex>
    </div>
  );
};

CategorySelect.defaultProps = {
  onChange: () => {},
  checkedItem: [],
  disabled: false,
  name: '',
};

CategorySelect.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkedItem: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default CategorySelect;

const StyledFlex = styled(Flex)`
  flex-wrap: wrap;
`;

const StyledInput = styled(Input)`
  display: none;
  &:checked + div {
    background-color: ${theme.color.main};
    color: #fff;
  }
`;

const StyledButton = styled.div`
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
