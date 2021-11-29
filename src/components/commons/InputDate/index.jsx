import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const InputDate = ({ initialState, name, accept, onChange }) => {
  const [date, setDate] = useState(initialState);
  const inputRef = useRef(null);

  const handleDateChange = e => {
    const { value } = e.target;
    const dateString = value.split('-');
    setDate({
      year: dateString[0],
      month: dateString[1],
      day: dateString[2],
    });
    onChange && onChange(dateString);
  };

  return (
    <div>
      <Input
        type="date"
        ref={inputRef}
        name={name}
        accept={accept}
        min={`${date.year}-${date.month}-${date.day}`}
        max={9999 - 12 - 21}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default InputDate;

InputDate.defaultProps = {
  initialState: {},
  name: '',
  accept: '',
  onChange: () => {},
};

InputDate.propTypes = {
  initialState: PropTypes.object,
  name: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func,
};

const Input = styled.input``;
