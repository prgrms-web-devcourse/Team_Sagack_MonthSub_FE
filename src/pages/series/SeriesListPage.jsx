import React, { useEffect, useRef, useState } from 'react';
import { CheckedButtonList } from '@molecules';
import { Loading } from '@atom';
import { CardList } from '@organisms';
import { Wrapper } from '@templates';
import { getSeries } from '@apis/series';
import { useHistory } from 'react-router-dom';
import { theme } from '@styles';
import styled from '@emotion/styled';

const SeriesListPage = () => {
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
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const setSeriesId = useRef(null);
  const pageEnd = useRef();

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

  const [status, setStatus] = useState('');

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

  useEffect(() => {
    getListUpdate();
  }, []);

  useEffect(() => {}, [list]);

  useEffect(() => {
    if (loading) {
      getListUpdate();
    }
  }, [params]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            currentParams.current['lastSeriesId'] = setSeriesId.current;
            updateParams('scroll');
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      let result = '';

      result = rowCategories
        .filter(obj => obj.value)
        .map(obj => obj.key)
        .join(',');

      currentParams.current['categories'] = result;
      updateParams('categories');
    }
  }, [rowCategories]);

  useEffect(() => {
    if (loading) {
      currentParams.current['status'] = status;
      updateParams('status');
    }
  }, [status]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StyledContainer>
            <CategoryWrapper>
              <CheckedButtonList
                list={ctgrList}
                onChange={handleCategoriesChange}
              />
              <CheckedButtonList
                list={statusList}
                onChange={handleStatusChange}
                type="radio"
                primaryKey={2}
                frameOnly
              />
            </CategoryWrapper>
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

const CategoryWrapper = styled.div`
  @media ${theme.device.laptop} {
    display: flex;
    > *:nth-of-type(2) {
      width: 400px;
    }
  }

  > *:nth-of-type(2) {
    justify-content: flex-end;
  }
`;
