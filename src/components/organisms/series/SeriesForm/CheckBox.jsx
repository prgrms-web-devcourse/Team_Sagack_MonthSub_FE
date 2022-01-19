import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ dataList }) => {
  // 상태는 렌더링에 쓰인다.. === checked에 쓰임
  const [checkedList, setCheckedList] = useState([]);

  const handleCheckedAll = e => {
    const { checked } = e.target;
    if (checked) {
      const allValues = dataList.map(({ value }) => value);
      setCheckedList(allValues);
    } else {
      setCheckedList([]);
    }
  };

  console.log(checkedList);

  const handelCheckedElement = e => {
    // 체크된 것들의 값들을 가져와 상태를 구성하는 로직
    const { value, checked } = e.target;
    if (checked) {
      checkedList.length === dataList.length
        ? setCheckedList([value])
        : setCheckedList([...checkedList, value]);
    } else {
      setCheckedList(checkedList.filter(el => el !== value));
    }
  };

  return (
    <div>
      <label label htmlFor="all">
        <input
          type="checkbox"
          id="all"
          onChange={handleCheckedAll}
          checked={checkedList.length === dataList.length ? true : null}
        />
        all
      </label>
      {dataList.map(({ id, value }) => (
        <label key={id} htmlFor={value}>
          <input
            key={id}
            id={value}
            type="checkbox"
            value={value}
            onChange={handelCheckedElement}
            checked={
              checkedList.length === dataList.length
                ? false
                : checkedList[0] === value
                ? true
                : null
            }
          />
          {value}
        </label>
      ))}
    </div>
  );
};

CheckBox.propTypes = {
  dataList: PropTypes.array.isRequired,
};

export default CheckBox;
