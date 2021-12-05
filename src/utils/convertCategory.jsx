const convertCategory = (ctgr) => {
  if (ctgr === 'NOVEL') {
    return '소설';
  } if (ctgr === 'ESSAY') {
    return '에세이';
  } if (ctgr === 'INTERVIEW') {
    return '인터뷰';
  } if (ctgr === 'POEM') {
    return '시';
  } if (ctgr === 'CRITIQUE') {
    return '평론';
  } if (ctgr === 'ETC') {
    return '기타';
  }
}

export default convertCategory;