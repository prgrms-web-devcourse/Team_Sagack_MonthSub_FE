import { useState } from 'react';
import { useSessionStorage } from '@hooks';

const useSignInForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setValue, removeValue } = useSessionStorage('authorization', '');

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSignInSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length === 0) {
      const { value } = await onSubmit(values);
      setValue(value.token);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  const handleSignOutSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
      removeValue('authorization');
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSignInSubmit,
    handleSignOutSubmit,
  };
};
export default useSignInForm;
