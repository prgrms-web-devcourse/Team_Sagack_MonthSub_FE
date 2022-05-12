import type { SeriesFormValueType, ErrorsType } from '@types';

const createEmptyValueMessage = (name: string): string => {
  switch (name) {
    case 'title':
      return '제목을 작성해주세요!';
    case 'introduceText':
      return '소개 문장을 작성해주세요!';
    case 'introduceSentence':
      return '게시글 설명을 작성해주세요!';
    case 'contents':
      return '아티클 내용을 작성해주세요!';
    case 'price':
      return '가격을 입력해주세요!';
    case 'subscribeStartDate':
      return '모집 시작 날짜를 설정해주세요!';
    case 'subscribeEndDate':
      return '모집 종료 날짜를 설정해주세요!';
    case 'seriesStartDate':
      return '연재 시작 날짜를 설정해주세요!';
    case 'seriesEndDate':
      return '연재 종료 날짜를 설정해주세요!';
    case 'category':
      return '카테고리를 선택해주세요!';
    case 'uploadTime':
      return '연재 시간을 설정해주세요!';
    case 'uploadDate':
      return '요일을 선택해주세요!';
    case 'articleCount':
      return '총 회차를 입력해주세요!';
    case 'thumbnailFile':
      return '이미지 파일을 업로드해주세요!';
    default:
      return '존재하지 않는 값입니다!';
  }
};

const checkEmptyPrimitiveValue = (value: string | number): boolean => {
  return !value;
};

const checkEmptyArray = (value: string[]): boolean => {
  const isEmpty = value instanceof Array && !value.length;
  return isEmpty;
};

const getEmptyValues = (values: SeriesFormValueType): ErrorsType => {
  const errors: ErrorsType = {};

  for (const [key, value] of Object.entries(values)) {
    if (checkEmptyArray(value) || checkEmptyPrimitiveValue(value)) {
      errors[key] = createEmptyValueMessage(key);
    }
  }
  return errors;
};

const compareUploadDateLength = (
  beforeValue: string[],
  newValue: string[],
): ErrorsType => {
  const errors: ErrorsType = {
    dayLength: '요일 수가 일치하지 않습니다!',
  };

  const notSameDayLength =
    Object.keys(beforeValue).length !== Object.keys(newValue).length;

  return notSameDayLength ? errors : {};
};

const alertErrorMessage = (errors: ErrorsType): void => {
  for (const value of Object.values(errors)) {
    alert(value);
  }
};

const validationWriteSeries = (values: SeriesFormValueType): void => {
  const emptyValues = getEmptyValues(values);
  Object.keys(emptyValues).length && alertErrorMessage(emptyValues);
};

const validationEditSeries = (
  beforeValues: SeriesFormValueType,
  newValues: SeriesFormValueType,
): void => {
  const emptyValues = getEmptyValues(newValues);
  const notSame = compareUploadDateLength(
    beforeValues.uploadDate,
    newValues.uploadDate,
  );

  // emptyValues에서 thumbnailFile 제거하기

  Object.keys(emptyValues).length && alertErrorMessage(emptyValues);
  Object.keys(notSame).length && alertErrorMessage(notSame);
};

export { validationWriteSeries, validationEditSeries };
