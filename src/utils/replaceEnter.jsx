const replaceEnter = contents => {
  let result;

  result = contents.replace(/\r\n/gi, '<br />');
  result = contents.replace(/\\n/gi, '<br />');
  result = contents.replace(/\n/gi, '<br />');

  return result;
};

export default replaceEnter;
