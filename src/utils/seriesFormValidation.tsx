import type { SeriesFormValueType } from '@types';

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

const isEmptyPrimitiveValue = (value: string | number): boolean => {
  return !!value;
};

const isEmptyArrayValue = (value: string[]): boolean => {
  return !!value.length;
};

const createEmptyValuesArr = (values: SeriesFormValueType) => {
  const notValidateValues: string[] = [];
  for (const [key, value] of Object.entries(values)) {
    if (value instanceof Array && isEmptyArrayValue(value)) {
      notValidateValues.push(key);
    } else if (isEmptyPrimitiveValue(value)) {
      notValidateValues.push(key);
    }
  }
  return notValidateValues;
};

const compareUploadDates = (
  beforeValue: string[],
  afterValue: string[],
): boolean => {
  return false;
};

const validationWriteSeries = (values: SeriesFormValueType): string[] => {
  return createEmptyValuesArr(values);
};

const validationEditSeries = (values: SeriesFormValueType): string[] => {
  return createEmptyValuesArr(values); // 이미지 파일이 포함되어 있으면 제거한다 필터링
  // 이미지 파일을 제외하고 빈 값을 체크한다.
  // 요일 체크의 경우 전 값과 같은 지 체크한다.
  // 원시 타입의 경우와 참조 타입의 경우가 있다.
};

export { validationWriteSeries, validationEditSeries, createEmptyValueMessage };
