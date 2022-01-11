import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Flex, Input } from '@components';
import theme from '@styles/theme';

const ButtonSelect = ({
  type,
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
      <Flex horizen justifyContent="flex-start">
        {labels.map(label => (
          <label key={label} htmlFor={label}>
            <StyledInput
              type={type}
              name={name}
              id={label}
              onChange={handleChange}
              value={label}
              checked={
                typeof checkedItem === 'object'
                  ? checkedItem.includes(label)
                  : checkedItem.toLowerCase() === label.toLowerCase()
              }
              disabled={disabled}
            />
            <StyledButton circle>{label}</StyledButton>
          </label>
        ))}
      </Flex>
    </div>
  );
};

ButtonSelect.defaultProps = {
  onChange: () => {},
  checkedItem: [],
  disabled: false,
  type: 'radio',
  name: '',
};

ButtonSelect.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkedItem: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
};

export default ButtonSelect;

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
