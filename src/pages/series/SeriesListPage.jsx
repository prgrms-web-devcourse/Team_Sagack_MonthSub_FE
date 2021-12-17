import React, { useEffect, useRef, useState } from 'react';
import {
  Wrapper,
  SelectContainer,
  Select,
  CardList,
  Category2,
} from '@components';
import { getSeriesScrolling } from '@apis/series';

const SeriesListPage = () => {
  const pageEnd = useRef();
  const setSeriesId = useRef(null);
  const setCategory = useRef('ALL');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    lastSeriesId: null,
    size: 20,
    categories: 'ALL',
    requestType: null,
  });

  const getListUpdate = async () => {
    const { data } = await getSeriesScrolling({
      lastSeriesId: params.lastSeriesId,
      size: params.size,
      categories: params.categories,
    });

    if (data.seriesList.length !== 0) {
      setSeriesId.current =
        data.seriesList[data.seriesList.length - 1].seriesId;
    }

    params.requestType === 'scroll'
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
              requestType: 'scroll',
            });
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  const categorizingHandler = e => {
    setParams({
      ...params,
      categories: e.target.id,
      lastSeriesId: null,
      requestType: 'category',
    });

    setCategory.current = e.target.id;
  };

  return (
    <Wrapper>
      <Category2
        onClick={e => categorizingHandler(e)}
        keyAndValues={[
          { key: 'ALL', value: '전체' },
          { key: 'NOVEL', value: '소설' },
          { key: 'POEM', value: '시' },
          { key: 'ESSAY', value: '수필' },
          { key: 'INTERVIEW', value: '인터뷰' },
          { key: 'CRITIQUE', value: '평론' },
          { key: 'ETC', value: '기타' },
        ]}
      />
      <SelectContainer>
        <Select
          name="default"
          options={[
            { value: 'newest', text: '최신순' },
            { value: 'hottest', text: '인기순' },
          ]}
        />
        <Select
          name="subscribeStatus"
          options={[
            { value: 'before', text: '모집중' },
            { value: 'after', text: '연재중' },
          ]}
        />
      </SelectContainer>
      <CardList list={list} />
      <div ref={pageEnd}>loading</div>
    </Wrapper>
  );
};

export default SeriesListPage;
