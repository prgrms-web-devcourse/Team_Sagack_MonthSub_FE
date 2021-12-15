const convertDay = dayList => {
  const result = [];

  for (let i = 0; i < dayList.length; i += 1) {
    if (dayList[i] === 'monday') {
      result.push('월요일');
    } else if (dayList[i] === 'tuesday') {
      result.push('화요일');
    } else if (dayList[i] === 'wednesday') {
      result.push('수요일');
    } else if (dayList[i] === 'thursday') {
      result.push('목요일');
    } else if (dayList[i] === 'friday') {
      result.push('금요일');
    } else if (dayList[i] === 'saturday') {
      result.push('토요일');
    } else if (dayList[i] === 'sunday') {
      result.push('일요일');
    } else {
      result.push(dayList[i]);
    }
  }

  return result;
};

export default convertDay;
