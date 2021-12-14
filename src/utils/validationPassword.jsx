const validationPassword = password => {
  const reg = /^[a-zA-Z0-9]{8,20}$/;
  return reg.test(password);
};

export default validationPassword;
