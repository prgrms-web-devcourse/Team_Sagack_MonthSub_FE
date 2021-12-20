import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, CardList, Category, Loading } from '@components';
import { getSeries } from '@apis/series';

const SeriesListPage = () => {
  const [buttonState, setButtonState] = useState({
    ALL: true,
    NOVEL: false,
    POEM: false,
    ESSAY: false,
    INTERVIEW: false,
    CRITIQUE: false,
    ETC: false,
  });
  const pageEnd = useRef();
  const requestType = useRef(null);
  const setSeriesId = useRef(null);
  const setCategory = useRef('ALL');
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
  };

  useEffect(() => {
    getListUpdate();
  }, []);

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

  const handleCategorizing = async e => {
    const nextState = {
      ...buttonState,
      [e.target.id]: !buttonState[e.target.id],
    };

    const clickedCategoryArray = Object.keys(nextState).filter(
      element => nextState[element],
    );

    if (clickedCategoryArray.length === 0) {
      nextState['ALL'] = true;
    }

    setButtonState(nextState);

    setParams({
      ...params,
      categories: Object.keys(nextState)
        .filter(element => nextState[element])
        .join(','),
      lastSeriesId: null,
    });

    const { data } = await getSeries({
      ...params,
      categories: Object.keys(nextState)
        .filter(element => nextState[element])
        .join(','),
      lastSeriesId: null,
    });

    setList(data.seriesList);

    requestType.current = 'category';
    setCategory.current = e.target.id;
  };

  return (
    <Wrapper whole>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Category
            onClick={handleCategorizing}
            categoryList={[
              { key: 'ALL', value: '전체', state: buttonState['ALL'] },
              { key: 'NOVEL', value: '소설', state: buttonState['NOVEL'] },
              { key: 'POEM', value: '시', state: buttonState['POEM'] },
              { key: 'ESSAY', value: '수필', state: buttonState['ESSAY'] },
              {
                key: 'INTERVIEW',
                value: '인터뷰',
                state: buttonState['INTERVIEW'],
              },
              {
                key: 'CRITIQUE',
                value: '평론',
                state: buttonState['CRITIQUE'],
              },
              { key: 'ETC', value: '기타', state: buttonState['ETC'] },
            ]}
          />
          <CardList list={list} />
        </>
      )}
      <div ref={pageEnd} />
    </Wrapper>
  );
};

export default SeriesListPage;
