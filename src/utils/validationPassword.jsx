const validationPassword = password => {
  const reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
  return reg.test(password);
};

export default validationPassword;
