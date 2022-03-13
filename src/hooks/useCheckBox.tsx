import { useState, useEffect } from 'react';

interface UseCheckBoxParameterType {
  name: string;
  valueList: string[];
  initialCheckeds: string[];
  filterMode: boolean;
  onChange: (name: string, checkedList: string[]) => void;
}

interface retunType {
  checkedList: string[];
  setCheckedList: (valueList: string[]) => void;
  handleCheckedAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckedElement: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useCheckBox = ({
  name,
  valueList,
  initialCheckeds,
  filterMode,
  onChange,
}: UseCheckBoxParameterType): retunType => {
  const [checkedList, setCheckedList] = useState(initialCheckeds);

  useEffect(() => {
    onChange && onChange(name, checkedList);
  }, [checkedList]);

  const handleCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedList(valueList);
    } else {
      !filterMode && setCheckedList([]);
    }
  };

  const handleCheckedElement = (e: React.ChangeEvent<HTMLInputElement>) => {
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
