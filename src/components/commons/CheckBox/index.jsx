import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, Title } from '@components';

const CheckBox = ({ labels, onChange, checkedInputs, title }) => {
  const handleChange = e => {
    onChange && onChange(e.target.checked, e.target.id);
  };
  return (
    <>
      <Title style={{ display: title ? 'block' : 'none' }} name={title} />
      <Container>
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
      </Container>
    </>
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

const Checkbox = styled.div`
  margin-right: 0.8rem;
`;

const StyledInput = styled(Input)`
  margin-right: 0.2rem;
`;
