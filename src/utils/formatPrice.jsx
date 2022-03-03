export const formatPrice = input => {
  const formatedValue = input
    .split('')
    .reverse()
    .map((str, index) => (index > 0 && index % 3 === 0 ? `${str},` : str))
    .reverse()
    .join('');
  return formatedValue;
};

// 가격 한글화 함수 작성
