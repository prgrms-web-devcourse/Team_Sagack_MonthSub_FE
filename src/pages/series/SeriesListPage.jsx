import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, CardList, Loading, CheckedButtonList } from '@components';
import { getSeries } from '@apis/series';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

const SeriesListPage = () => {
  // state
  // 공통
  const size = 16;
  const [list, setList] = useState([]);
  const [params, setParams] = useState({
    lastSeriesId: null,
    size,
    status: '',
    categories: '',
  });
  const currentParams = useRef({
    lastSeriesId: null,
    size,
    categories: '',
    status: '',
  });
  const requestType = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory(); // 에러페이지

  // 무한스크롤
  const [loading, setLoading] = useState(false);
  const setSeriesId = useRef(null);
  const pageEnd = useRef();

  // 카테고라이징
  const [rowCategories, setRowCategories] = useState([
    { key: 'NOVEL', value: false },
    { key: 'POEM', value: false },
    { key: 'ESSAY', value: false },
    { key: 'INTERVIEW', value: false },
    { key: 'CRITIQUE', value: false },
    { key: 'ETC', value: false },
  ]);

  const ctgrList = [
    {
      value: 'ALL',
      text: '전체',
    },
    {
      value: 'NOVEL',
      text: '소설',
    },
    {
      value: 'POEM',
      text: '시',
    },
    {
      value: 'ESSAY',
      text: '에세이',
    },
    {
      value: 'INTERVIEW',
      text: '인터뷰',
    },
    {
      value: 'CRITIQUE',
      text: '평론',
    },
    {
      value: 'ETC',
      text: '기타',
    },
  ];

  const statusList = [
    {
      value: '',
      text: '전체',
    },
    {
      value: 'SERIALIZATION_AVAILABLE',
      text: '연재중',
    },
    {
      value: 'SUBSCRIPTION_AVAILABLE',
      text: '모집중',
    },
  ];

  // 스테이터스
  const [status, setStatus] = useState('');

  // Function
  const afterMount = () => {
    if (list.length === 0) {
      return false;
    }
    return true;
  };

  const getListUpdate = async () => {
    const { data } = await getSeries(params);

    if (!data) {
      history.push('/server-error');
      return;
    }

    if (data.seriesList.length !== 0) {
      setSeriesId.current =
        data.seriesList[data.seriesList.length - 1].seriesId;
    }

    requestType.current === 'scroll'
      ? setList(prev => [...prev, ...data.seriesList])
      : setList(data.seriesList);

    setLoading(true);
    setIsLoading(false);
  };

  const handleCategoriesChange = e => {
    const { value } = e.target;

    if (value === 'ALL') {
      setRowCategories([
        { key: 'NOVEL', value: false },
        { key: 'POEM', value: false },
        { key: 'ESSAY', value: false },
        { key: 'INTERVIEW', value: false },
        { key: 'CRITIQUE', value: false },
        { key: 'ETC', value: false },
      ]);
    } else if (value !== 'ALL') {
      setRowCategories(
        rowCategories.map(obj =>
          obj.key === value ? { ...obj, value: !obj.value } : obj,
        ),
      );
    }
  };

  const handleStatusChange = e => {
    const { value } = e.target;
    setStatus(value);
  };

  // useEffect
  // 파라미터
  useEffect(() => {
    getListUpdate();
  }, [params]);

  const updateParams = type => {
    setParams({
      ...params,
      lastSeriesId:
        type === 'scroll' ? currentParams.current['lastSeriesId'] : null,
      status: currentParams.current['status'],
      categories: currentParams.current['categories'],
    });

    requestType.current = type;
  };

  // 무한스크롤
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            // 현재 lastId와 업데이트 하려는 lastId가 다를 때만 무한스크롤 작동
            currentParams.current['lastSeriesId'] = setSeriesId.current;
            updateParams('scroll');
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  // 카테고라이징
  useEffect(() => {
    if (afterMount()) {
      let result = '';

      result = rowCategories
        .filter(obj => obj.value)
        .map(obj => obj.key)
        .join(',');

      currentParams.current['categories'] = result;
      updateParams('categories');
    }
  }, [rowCategories]);

  // 스테이터스
  useEffect(() => {
    currentParams.current['status'] = status;
    updateParams('status');
  }, [status]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StyledContainer>
            <div>
              <CheckedButtonList
                list={ctgrList}
                onChange={handleCategoriesChange}
              />
            </div>
            <div>
              <CheckedButtonList
                list={statusList}
                onChange={handleStatusChange}
                type="radio"
                primaryKey={2}
              />
            </div>
          </StyledContainer>

          <CardList list={list} />
        </>
      )}
      <div ref={pageEnd} />
    </Wrapper>
  );
};

export default SeriesListPage;

const StyledContainer = styled.div`
  padding-bottom: 1.25rem;
`;
