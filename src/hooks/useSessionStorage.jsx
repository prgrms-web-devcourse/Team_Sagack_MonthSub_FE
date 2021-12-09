import { useState } from 'react';

const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      alert(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value;

      setStoredValue(valueToStore);
      sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      alert(error);
    }
  };

  const removeValue = key => {
    try {
      setStoredValue('');
      sessionStorage.removeItem(key);
    } catch (error) {
      alert(error);
    }
  };

  return { storedValue, setValue, removeValue };
};

export default useSessionStorage;
