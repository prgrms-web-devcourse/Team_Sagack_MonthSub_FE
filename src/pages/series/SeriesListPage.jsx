import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, CardList, Category } from '@components';
import { getSeries } from '@apis/series';

const SeriesListPage = () => {
  const pageEnd = useRef();
  const requestType = useRef(null);
  const setSeriesId = useRef(null);
  const setCategory = useRef('ALL');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    lastSeriesId: null,
    size: 20,
    categories: 'ALL',
  });

  const getListUpdate = async () => {
    const { data } = await getSeries(params);

    if (data.seriesList.length !== 0) {
      setSeriesId.current =
        data.seriesList[data.seriesList.length - 1].seriesId;
    }

    requestType.current === 'scroll'
      ? setList(prev => [...prev, ...data.seriesList])
      : setList(data.seriesList);

    setLoading(true);
  };

  useEffect(() => {
    getListUpdate();
  }, [params]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setParams({
              ...params,
              categories: setCategory.current,
              lastSeriesId: setSeriesId.current,
            });

            requestType.current = 'scroll';
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  const handleCategorizing = e => {
    setParams({
      ...params,
      categories: e.target.id,
      lastSeriesId: null,
    });

    requestType.current = 'category';
    setCategory.current = e.target.id;
  };

  return (
    <Wrapper>
      <Category
        onClick={handleCategorizing}
        categoryList={[
          { key: 'ALL', value: '전체' },
          { key: 'NOVEL', value: '소설' },
          { key: 'POEM', value: '시' },
          { key: 'ESSAY', value: '수필' },
          { key: 'INTERVIEW', value: '인터뷰' },
          { key: 'CRITIQUE', value: '평론' },
          { key: 'ETC', value: '기타' },
        ]}
      />
      <CardList list={list} />
      <div ref={pageEnd} />
    </Wrapper>
  );
};

export default SeriesListPage;
