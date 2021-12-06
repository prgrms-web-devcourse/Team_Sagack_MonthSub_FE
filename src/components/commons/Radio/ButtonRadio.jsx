import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';

const ButtonRadio = ({ onChange, names = [], checkedButton, disabled }) => {
  const handleChange = e => {
    onChange && onChange(e);
  };
  return (
    <div>
      <List horizen justifyContent="center">
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
            <div>{name}</div>
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

const Label = styled.label`
  width: 6.25rem;
  padding: 0.5rem;
  border: 0.0625rem solid #000;
  cursor: pointer;
  user-select: none;
  border-radius: 50px;
  margin: 0 0.625rem;
  text-align: center;
`;

const StyledRadioInput = styled.input`
  display: none;
  &:checked + div {
    color: blue;
  }
`;
