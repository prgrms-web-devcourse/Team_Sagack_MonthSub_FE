import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { List } from '@components';

const Category = ({ onChange, names = [] }) => {
  const handleChange = e => {
    onChange && onChange(e);
  };
  return (
    <div>
      <List horizen justifyContent="center">
        {names.map(name => (
          <Label>
            <StyledRadioInput
              type="radio"
              name="category"
              value={name}
              onChange={handleChange}
            />
            {name}
          </Label>
        ))}
      </List>
    </div>
  );
};

Category.defaultProps = {
  onChange: () => {},
};

Category.propTypes = {
  onChange: PropTypes.func,
  names: PropTypes.array.isRequired,
};

export default Category;

const Label = styled.label`
  width: 100px;
  padding: 0.5rem;
  border: 0.0625rem solid #000;
  cursor: pointer;
  user-select: none;
  border-radius: 50px;
  margin: 0 10px;
  text-align: center;
`;

const StyledRadioInput = styled.input`
  display: none;
`;
