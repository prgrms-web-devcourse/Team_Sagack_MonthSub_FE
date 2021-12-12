const calculateLaterDate = (currentDate, n) => {
  const arr = currentDate.split('-');
  const laterDate = new Date(
    Number(arr[0]),
    Number(arr[1]) - 1,
    Number(arr[2]),
  );
  laterDate.setDate(laterDate.getDate() + n);
  const year = laterDate.getFullYear();
  const month = laterDate.getMonth() + 1;
  const date = laterDate.getDate();
  return `${year}-${month >= 10 ? month : `0${month}`}-${
    date >= 10 ? date : `0${date}`
  }`;
};

export default calculateLaterDate;
