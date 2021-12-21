import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List, Input, Title } from '@components';
import theme from '@styles/theme';

const ButtonRadio = ({
  title,
  onChange,
  labels = [],
  checkedButton,
  disabled,
  ...props
}) => {
  const handleChange = e => {
    onChange && onChange(e);
  };
  return (
    <div {...props}>
      <Title style={{ display: title ? 'block' : 'none' }} name={title} />
      <List horizen justifyContent="flex-start">
        {labels.map(label => (
          <label key={label} htmlFor={label}>
            <StyledRadioInput
              type="radio"
              name="category"
              value={label}
              id={label}
              onChange={handleChange}
              disabled={disabled}
              checked={checkedButton.toLowerCase() === label.toLowerCase()}
            />
            <StyledButton circle>{label}</StyledButton>
          </label>
        ))}
      </List>
    </div>
  );
};

ButtonRadio.defaultProps = {
  onChange: () => {},
  disabled: false,
  checkedButton: '',
  title: '',
};

ButtonRadio.propTypes = {
  onChange: PropTypes.func,
  labels: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  checkedButton: PropTypes.string,
  title: PropTypes.string,
};

export default ButtonRadio;

const StyledRadioInput = styled(Input)`
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
