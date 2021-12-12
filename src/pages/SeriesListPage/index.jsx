import React, { useEffect, useState } from 'react';
import { Wrapper, SelectContainer, Select, CardList } from '@components';
import { getSeries } from '@apis/series';

const SeriesListPage = () => {
  const [list, setList] = useState([]);

  const getInitialData = async () => {
    const response = await getSeries();
    setList(response);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
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
      <CardList list={list.data} />
    </Wrapper>
  );
};

export default SeriesListPage;
