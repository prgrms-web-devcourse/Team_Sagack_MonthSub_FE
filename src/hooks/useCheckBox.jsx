import { useState } from 'react';

const useCheckBox = ({ valueList, initialCheckeds }) => {
  const [checkedList, setCheckedList] = useState(initialCheckeds);

  const handleCheckedAll = e => {
    const { checked } = e.target;
    if (checked) {
      const allValue = valueList.map(({ value }) => value);
      setCheckedList(allValue);
    } else {
      setCheckedList([]);
    }
  };

  const handelCheckedElement = e => {
    const { value, checked } = e.target;
    if (checked) {
      checkedList.length === valueList.length
        ? setCheckedList([value])
        : setCheckedList([...checkedList, value]);
    } else {
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
