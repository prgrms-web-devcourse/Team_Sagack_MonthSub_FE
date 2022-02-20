import { useCallback, useState } from 'react';

const useToggle = (initState = false) => {
  const [state, setState] = useState(initState);
  const toggle = useCallback(() => setState(state => !state), []);

  return [state, setState, toggle];
};

export default useToggle;
