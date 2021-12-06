import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';

const ButtonRadio = ({
  onChange,
  names = [],
  checkedButton,
  disabled,
  ...props
}) => {
  const handleChange = e => {
    onChange && onChange(e);
  };
  return (
    <div {...props}>
      <List horizen justifyContent="flex-start">
        {names.map(name => (
          <Label key={name}>
            <StyledRadioInput
              type="radio"
              name="category"
              value={name}
              onChange={handleChange}
              disabled={disabled}
              checked={
                checkedButton
                  ? checkedButton.toLowerCase() === name.toLowerCase()
                  : null
              }
            />
            <StyledButton circle>{name}</StyledButton>
          </Label>
        ))}
      </List>
    </div>
  );
};

ButtonRadio.defaultProps = {
  onChange: () => {},
  disabled: false,
  checkedButton: '',
};

ButtonRadio.propTypes = {
  onChange: PropTypes.func,
  names: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  checkedButton: PropTypes.string,
};

export default ButtonRadio;

const Label = styled.label``;

const StyledRadioInput = styled.input`
  display: none;
  &:checked + div {
    color: #ffb15c;
  }
`;

const StyledButton = styled.div`
  width: 6.25rem;
  padding: 0.3rem;
  cursor: pointer;
  user-select: none;
  border-radius: 50px;
  margin-right: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  text-align: center;
  &:hover {
    color: #ffb15c;
  }
`;
