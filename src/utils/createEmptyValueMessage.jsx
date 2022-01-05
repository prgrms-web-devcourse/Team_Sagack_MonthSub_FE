const createEmptyValueMessage = name => {
  if (name === 'title') {
    return '제목을 작성해주세요!';
  }
  if (name === 'introduceText') {
    return '소개 문장을 작성해주세요!';
  }
  if (name === 'introduceSentence') {
    return '게시글 설명을 작성해주세요!';
  }
  if (name === 'contents') {
    return '아티클 내용을 작성해주세요!';
  }
  if (name === 'price') {
    return '가격을 입력해주세요!';
  }
  if (name === 'subscribeStartDate') {
    return '모집 시작 날짜를 설정해주세요!';
  }
  if (name === 'subscribeEndDate') {
    return '모집 종료 날짜를 설정해주세요! ';
  }
  if (name === 'seriesStartDate') {
    return '연재 시작 날짜를 설정해주세요!';
  }
  if (name === 'seriesEndDate') {
    return '연재 종료 날짜를 설정해주세요!';
  }
  if (name === 'category') {
    return '카테고리를 선택해주세요!';
  }
  if (name === 'uploadTime') {
    return '연재 시간을 설정해주세요!';
  }
  if (name === 'articleCount') {
    return '총 회차를 입력해주세요!';
  }

  if (name === 'thumbnailFile') {
    return '이미지 파일을 업로드해주세요!';
  }

  if (name === 'uploadDate') {
    return '연재 요일을 선택해주세요!';
  }
};

export default createEmptyValueMessage;
