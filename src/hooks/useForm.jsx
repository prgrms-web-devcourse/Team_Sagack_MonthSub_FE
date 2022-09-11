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

  const handlePrice = e => {
    const { name, value } = e.target;

    const filteredValue = value.replace(/[^0-9]/g, '').replace(/(^0+)/g, '');
    setValues({ ...values, [name]: filteredValue });
  };

  const handleCheckbox = e => {
    const { name, value, checked } = e.target;

    if (checked) {
      const checkedValues = [...values[name], value];
      setValues({ ...values, [name]: checkedValues });
    }

    if (!checked) {
      const checkedValues = values[name].filter(
        checkedItem => checkedItem !== value,
      );
      setValues({ ...values, [name]: checkedValues });
    }
  };

  const handleCheckboxAll = (e, allValues) => {
    const { name, checked } = e.target;

    if (checked) {
      setValues({ ...values, [name]: allValues });
    }

    if (!checked) {
      setValues({ ...values, [name]: [] });
    }
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

  return {
    values,
    errors,
    isLoading,
    setValues,
    handleChange,
    handlePrice,
    handleCheckbox,
    handleCheckboxAll,
    handleImageUpload,
    handleSubmit,
  };
};
export default useForm;
