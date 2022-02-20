import { useState, useEffect } from 'react';

const useCheckBox = ({
  name = '',
  valueList,
  initialCheckeds,
  filterMode,
  onChange,
}) => {
  const [checkedList, setCheckedList] = useState(initialCheckeds);

  useEffect(() => {
    onChange && onChange(name, checkedList);
  }, [checkedList]);

  const handleCheckedAll = e => {
    const { checked } = e.target;
    if (checked) {
      setCheckedList(valueList);
    } else {
      !filterMode && setCheckedList([]);
    }
  };

  const handleCheckedElement = e => {
    const { value, checked } = e.target;
    if (checked) {
      checkedList.length === valueList.length
        ? setCheckedList([value])
        : setCheckedList([...checkedList, value]);
    } else {
      if (filterMode && checkedList.length === 1) {
        setCheckedList(valueList);
        return;
      }
      setCheckedList(checkedList.filter(checkedItem => checkedItem !== value));
    }
  };

  return {
    checkedList,
    setCheckedList,
    handleCheckedAll,
    handleCheckedElement,
  };
};

export default useCheckBox;
