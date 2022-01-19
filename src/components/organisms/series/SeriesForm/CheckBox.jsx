import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ dataList, initialData, onChange }) => {
  // 상태는 렌더링에 쓰인다.. === checked에 쓰임
  const [checkedList, setCheckedList] = useState(initialData);

  const handleCheckedAll = e => {
    const { checked } = e.target;
    if (checked) {
      const allValues = dataList.map(({ value }) => value);
      setCheckedList(allValues);
    } else {
      setCheckedList([]);
    }
  };

  const handelCheckedElement = e => {
    const { value, checked } = e.target;
    if (checked) {
      checkedList.length === dataList.length
        ? setCheckedList([value])
        : setCheckedList([...checkedList, value]);
    } else {
      setCheckedList(checkedList.filter(el => el !== value));
    }
  };

  useEffect(() => {
    onChange && onChange(checkedList);
  }, [checkedList]);

  return (
    <div>
      <label htmlFor="all">
        <input
          type="checkbox"
          id="all"
          onChange={handleCheckedAll}
          checked={checkedList.length === dataList.length}
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
                : !!checkedList.includes(value)
            }
          />
          {value}
        </label>
      ))}
    </div>
  );
};

CheckBox.defaultProps = {
  initialData: [],
  onChange: () => {},
};

CheckBox.propTypes = {
  dataList: PropTypes.array.isRequired,
  initialData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
};

export default CheckBox;

// checked의 초기값과
// 부모에게 상태를 전달해줄 때 매번 변화하는 상태를 전달해야해서 useEffect에 의존성을 걸어줬다
