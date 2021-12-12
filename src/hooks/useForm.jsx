import { useState, useEffect } from 'react';

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => () => {
      setErrors({});
      setIsLoading(false);
    },
    [],
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate(values);
    if (!newErrors || Object.keys(newErrors).length === 0) {
      await onSubmit(values);
      setErrors({ newErrors });
    } else setErrors(newErrors);
    setIsLoading(false);
  };

  const handleImageUpload = e => {
    const { name, files } = e.target;
    const imageFile = files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      setValues({
        ...values,
        [name]: fileReader.result,
        [`${name}File`]: imageFile,
      });
    };
  };

  return {
    values,
    errors,
    isLoading,
    setValues,
    handleChange,
    handleSubmit,
    handleImageUpload,
  };
};
export default useForm;
