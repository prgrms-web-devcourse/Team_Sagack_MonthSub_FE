import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, CardList, Loading } from '@components';
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

  const categoriesRef = useRef([]); // checked속성에 접근하기 위한 용도

  // 스테이터스
  const [status, setStatus] = useState('');

  // Function
  const afterMount = () => {
    if (list.length === 0) {
      return false;
    }
    return true;
  };

  const reverseChecked = () => {
    for (let i = 0; i < categoriesRef.current.length; i += 1) {
      if (i === 0) {
        categoriesRef.current[i].checked = true;
        categoriesRef.current[i].disabled = true;
      } else {
        categoriesRef.current[i].checked = false;
      }
    }
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
    let countChecked = 0;

    if (value === 'ALL') {
      setRowCategories([
        { key: 'NOVEL', value: false },
        { key: 'POEM', value: false },
        { key: 'ESSAY', value: false },
        { key: 'INTERVIEW', value: false },
        { key: 'CRITIQUE', value: false },
        { key: 'ETC', value: false },
      ]);
      reverseChecked();
    } else if (value !== 'ALL') {
      if (categoriesRef.current[0].checked) {
        categoriesRef.current[0].checked = false;
        categoriesRef.current[0].disabled = false;
      }

      setRowCategories(
        rowCategories.map(obj =>
          obj.key === value ? { ...obj, value: !obj.value } : obj,
        ),
      );

      countChecked = categoriesRef.current.filter(el => el.checked).length;

      if (countChecked === 0) {
        reverseChecked();
      }
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
            if (setSeriesId.current !== currentParams.current['lastSeriesId']) {
              currentParams.current['lastSeriesId'] = setSeriesId.current;
              updateParams('scroll');
            }
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
    <Wrapper whole>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StyledContainer>
            <form onChange={handleCategoriesChange}>
              <input
                type="checkbox"
                value="ALL"
                id="ctgr1"
                ref={el => {
                  categoriesRef.current[0] = el;
                }}
                defaultChecked
                disabled
              />
              <label htmlFor="ctgr1">전체</label>
              <input
                type="checkbox"
                value="NOVEL"
                id="ctgr2"
                ref={el => {
                  categoriesRef.current[1] = el;
                }}
              />
              <label htmlFor="ctgr2">소설</label>
              <input
                type="checkbox"
                value="POEM"
                id="ctgr3"
                ref={el => {
                  categoriesRef.current[2] = el;
                }}
              />
              <label htmlFor="ctgr3">시</label>
              <input
                type="checkbox"
                value="ESSAY"
                id="ctgr4"
                ref={el => {
                  categoriesRef.current[3] = el;
                }}
              />
              <label htmlFor="ctgr4">에세이</label>
              <input
                type="checkbox"
                value="INTERVIEW"
                id="ctgr5"
                ref={el => {
                  categoriesRef.current[4] = el;
                }}
              />
              <label htmlFor="ctgr5">인터뷰</label>
              <input
                type="checkbox"
                value="CRITIQUE"
                id="ctgr6"
                ref={el => {
                  categoriesRef.current[5] = el;
                }}
              />
              <label htmlFor="ctgr6">평론</label>
              <input
                type="checkbox"
                value="ETC"
                id="ctgr7"
                ref={el => {
                  categoriesRef.current[6] = el;
                }}
              />
              <label htmlFor="ctgr7">기타</label>
            </form>
            <select onChange={handleStatusChange}>
              <option value="">전체</option>
              <option value="SERIALIZATION_AVAILABLE">연재중</option>
              <option value="SUBSCRIPTION_AVAILABLE">모집중</option>
            </select>
          </StyledContainer>
          <CardList list={list} />
        </>
      )}
      <div ref={pageEnd}>로딩</div>
    </Wrapper>
  );
};

export default SeriesListPage;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.25rem;
`;
