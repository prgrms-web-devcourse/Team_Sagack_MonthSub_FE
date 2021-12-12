const jsonBlob = obj =>
  new Blob([JSON.stringify(obj)], {
    type: 'application/json',
  });

export default jsonBlob;
