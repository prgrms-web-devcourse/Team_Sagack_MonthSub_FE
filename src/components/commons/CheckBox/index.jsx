import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, Title } from '@components';
import theme from '@styles/theme';

const CheckBox = ({ labels, onChange, checkedInputs, title, ...props }) => {
  const handleChange = e => {
    onChange && onChange(e.target.checked, e.target.id);
  };
  return (
    <div {...props}>
      <Title style={{ display: title ? 'block' : 'none' }} name={title} />
      <Container>
        {labels.map(label => (
          <label key={label} htmlFor={label}>
            <StyledCheckBoxInput
              type="checkbox"
              name="date"
              id={label}
              onChange={handleChange}
              value=""
              checked={checkedInputs.includes(label)}
            />
            <StyledButton circle>{label}</StyledButton>
          </label>
        ))}
      </Container>
    </div>
  );
};

CheckBox.defaultProps = {
  onChange: () => {},
  checkedInputs: [],
  title: '',
};

CheckBox.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkedInputs: PropTypes.array,
  title: PropTypes.string,
};

export default CheckBox;

const Container = styled.div`
  display: flex;
`;

const StyledCheckBoxInput = styled(Input)`
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
