const convertSeriesInputName = name => {
  if (name === 'title') {
    return '제목';
  }
  if (name === 'introduceText') {
    return '소개 문장';
  }
  if (name === 'introduceSentence') {
    return '게시글 설명';
  }
  if (name === 'price') {
    return '가격';
  }
  if (name === 'subscribeStartDate') {
    return '모집 시작 날짜';
  }
  if (name === 'subscribeEndDate') {
    return '모집 종료 날짜 ';
  }
  if (name === 'seriesStartDate') {
    return '구독 시작 날짜';
  }
  if (name === 'seriesEndDate') {
    return '구독 종료 날짜';
  }
  if (name === 'category') {
    return '카테고리';
  }
  if (name === 'uploadTime') {
    return '기타';
  }
  if (name === 'articleCount') {
    return '총 회차';
  }

  if (name === 'thumbnailFile') {
    return '이미지';
  }
};

export default convertSeriesInputName;
