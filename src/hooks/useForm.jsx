import { useState, useEffect } from 'react';

const useForm = ({ initialValues, onSubmit, validate, dep }) => {
  const [values, setValues] = useState(initialValues || dep);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dep && setValues(() => dep);
  }, [dep]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate(values);
    if (!newErrors || Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  const handleImageUpload = e => {
    const { name, files } = e.target;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      setValues({
        ...values,
        [name]: {
          file: files[0],
          url: fileReader.result,
        },
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
