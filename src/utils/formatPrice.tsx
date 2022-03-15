export const formatPriceAddComma = (input: string): string => {
  const formatedValue = input
    .split('')
    .reverse()
    .map((str, index) => (index > 0 && index % 3 === 0 ? `${str},` : str))
    .reverse()
    .join('');
  return formatedValue;
};

const changeNumberToText = (value: string) => {
  switch (value) {
    case '1':
      return '일';
    case '2':
      return '이';
    case '3':
      return '삼';
    case '4':
      return '사';
    case '5':
      return '오';
    case '6':
      return '육';
    case '7':
      return '칠';
    case '8':
      return '팔';
    case '9':
      return '구';
    default:
      return '';
  }
};

const addNumberUnit = (str: string, index: number) => {
  const formattedValue = changeNumberToText(str);
  if (str === '0') {
    return '';
  }
  switch (index % 4) {
    case 1:
      return `${formattedValue}십`;
    case 2:
      return `${formattedValue}백`;
    case 3:
      return `${formattedValue}천`;
    default:
      return formattedValue;
  }
};

export const formatPriceToText = (value: string): string => {
  const reversedValueArr = value.split('').reverse();

  const thousandUnitValue = reversedValueArr
    .slice(0, 4)
    .map((str, index) => addNumberUnit(str, index))
    .reverse()
    .join('');

  const tenThousandUnitValue =
    value.length <= 4
      ? ''
      : reversedValueArr
          .slice(4)
          .map((str, index) => addNumberUnit(str, index))
          .reverse()
          .join('')
          .concat('만');

  return tenThousandUnitValue + thousandUnitValue;
};

export default formatPriceAddComma;
