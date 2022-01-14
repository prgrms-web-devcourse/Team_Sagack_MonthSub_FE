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
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { name, value, checked } = e.target;
      checked
        ? setValues({ ...values, [name]: [...values[name], value] })
        : setValues({
            ...values,
            [name]: values[name].filter(el => el !== value),
          });
      return;
    }
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
        [`${name}Url`]: fileReader.result,
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
