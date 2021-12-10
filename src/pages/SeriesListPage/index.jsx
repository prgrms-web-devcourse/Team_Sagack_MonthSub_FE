import React, { useEffect, useState } from 'react';
import { Wrapper, SelectContainer, Select, CardList } from '@components';
import { getSeries } from '@apis/series';

const SeriesListPage = () => {
  const [list, setList] = useState({});
  useEffect(
    async () => setList(await getSeries({ url: '/series/sort?sort=RECENT' })),
    [],
  );
  const getList = list.data;

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
      <CardList list={getList} />
    </Wrapper>
  );
};

export default SeriesListPage;
