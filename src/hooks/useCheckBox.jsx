import { useState } from 'react';

const useCheckBox = ({ valueList, initialCheckeds, filterMode }) => {
  const [checkedList, setCheckedList] = useState(initialCheckeds);
  const ALL_VALUE = valueList.map(({ value }) => value);

  const handleCheckedAll = e => {
    const { checked } = e.target;
    if (checked) {
      setCheckedList(ALL_VALUE);
    } else {
      !filterMode && setCheckedList([]);
    }
  };

  const handelCheckedElement = e => {
    const { value, checked } = e.target;
    if (checked) {
      checkedList.length === valueList.length
        ? setCheckedList([value])
        : setCheckedList([...checkedList, value]);
    } else {
      if (filterMode && checkedList.length === 1) {
        setCheckedList(ALL_VALUE);
        return;
      }
      setCheckedList(checkedList.filter(checkedItem => checkedItem !== value));
    }
  };

  return {
    checkedList,
    setCheckedList,
    handleCheckedAll,
    handelCheckedElement,
  };
};

export default useCheckBox;
