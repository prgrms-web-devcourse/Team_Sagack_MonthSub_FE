import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useFetch = ({ initialValues, apiName, id = '' }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState(initialValues);

  const getInitialData = async () => {
    const { data } = await apiName({ id });

    if (!data) {
      history.push('/server-error');
    }

    setValues(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return { values, setValues, isLoading, setIsLoading };
};

export default useFetch;
