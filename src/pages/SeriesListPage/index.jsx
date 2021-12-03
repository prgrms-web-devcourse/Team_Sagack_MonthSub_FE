import React from 'react';
import {
  Wrapper,
  SelectContainer,
  Select,
  CardList,
} from '@components';
import dummy from './seriesList.json'

// Select value이름이 api 정렬 요청 키워드
const SeriesListPage = () => (
  <Wrapper>
    <SelectContainer>
      <Select name='default' options={
        [{value: 'newest', text: '최신순'}, {value: 'hottest', text: '인기순'}]
      } />
      <Select name='subscribeStatus' options={
        [{value: 'before', text: '모집중'}, {value: 'after', text: '연재중'}]
      } />
    </SelectContainer>
    <CardList list={ dummy.data } />
  </Wrapper>
);

export default SeriesListPage;
