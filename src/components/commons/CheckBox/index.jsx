import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input } from '@components';

const CheckBox = ({ labels, onChange, checkedInputs }) => {
  const handleChange = e => {
    onChange && onChange(e.target.checked, e.target.id);
  };
  return (
    <Wrapper>
      {labels.map(label => (
        <Checkbox key={label}>
          <StyledInput
            type="checkbox"
            name="date"
            id={label}
            onChange={handleChange}
            value=""
            checked={checkedInputs.includes(label)}
          />
          <span>{label}</span>
        </Checkbox>
      ))}
    </Wrapper>
  );
};

CheckBox.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkedInputs: PropTypes.array,
};

CheckBox.defaultProps = {
  onChange: () => {},
  checkedInputs: [],
};

export default CheckBox;

const Wrapper = styled.div`
  display: flex;
`;

const Checkbox = styled.div`
  margin-right: 0.8rem;
`;

const StyledInput = styled(Input)`
  margin-right: 0.2rem;
`;
