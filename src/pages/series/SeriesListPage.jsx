import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, CardList, Category, Loading } from '@components';
import { getSeries } from '@apis/series';
import { useHistory } from 'react-router-dom';

const SeriesListPage = () => {
  const history = useHistory();
  const [buttonState, setButtonState] = useState({
    ALL: false,
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
  const [allButton, setAllButton] = useState(true);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    lastSeriesId: null,
    size: 20,
    status: '',
    categories: '',
  });

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
      [e.target.id]:
        e.target.id === 'ALL'
          ? buttonState[e.target.id]
          : !buttonState[e.target.id],
    };

    if (e.target.id === 'ALL') {
      allButton ? setAllButton(false) : setAllButton(true);
    }

    setButtonState(nextState);

    setParams({
      ...params,
      categories: Object.keys(nextState)
        .filter(element => nextState[element])
        .join(','),
      lastSeriesId: null,
    });

    const clickedList = Object.keys(nextState).filter(
      element => nextState[element],
    );

    if (clickedList.length >= 1) {
      setAllButton(false);
    } else {
      setAllButton(true);
    }

    const { data } = await getSeries({
      ...params,
      categories: e.target.id === 'ALL' ? '' : clickedList.join(','),
      lastSeriesId: null,
    });

    if (!data) {
      history.push('/server-error');
      return;
    }

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
              { key: 'ALL', value: '전체', state: allButton },
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
