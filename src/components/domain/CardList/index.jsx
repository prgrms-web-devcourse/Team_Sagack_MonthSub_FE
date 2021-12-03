import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const CardList = ({ list, ...props }) => (
  <CardContainer {...props}>
    {
      list.map(item =>
        <Card>
          <div>img</div>
          <div>
            <div>
              <div>{ item.nickname }</div>
              <div>Likes</div>
            </div>
            <div className="title">{ item.title }</div>
            <div>
              <div>{ item.category }</div>
              <div>{ item.subscribe_start_date } ~ { item.subscribe_end_date }</div>
            </div>
          </div>
        </Card>  
      )
    }
  </CardContainer>
);

CardList.defaultProps = {
  list: '',
}

CardList.propTypes = {
  list: PropTypes.node,
}

export default CardList;

const CardContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow : row wrap;
`;

/* 
  카드 컨텐츠의 width는 100%에서 컨텐츠 개수 대비 
  총 margin-right 값(n개면 margin * (n-1))을 제외한 나머지 너비를
  contentsMaxCount(한줄에 출력될 컨텐츠의 갯수)로 나눈 값이다.
  웹에서는 한줄에 4개, 타블렛에선 3개, 모바일에선 2개처럼 컨텐츠의 갯수를
  반응형으로 구현할 경우 contentsMaxCount에 변화를 주면 된다.

  nth-child을 사용해 맥스 컨텐츠의 배수(flex-end에 닿는 컨텐츠)에는 마진을 적용하지 않는다.
*/
const margin = '30px';
const contentsMaxCount = 4;
const Card = styled.div`
  width: calc((100% - (${margin} * ${contentsMaxCount - 1})) / ${contentsMaxCount});
  margin-right: ${margin};
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  &:nth-child(${contentsMaxCount}n) {
    margin-right: 0;
  }
  
  > div:nth-child(1) {
    height: 11rem;
    background-color: #aaaaaa;
  }
  
  > div:nth-child(2) {
    flex-grow: 1;
    font-size: 0.875rem;
    color: #4b4b4b;
    padding: 0.875rem;
    background-color: #eaeaea;
    
    > div {
      margin-bottom: 0.875rem;
    }
    
    > div:last-child {
      margin-bottom: 0;
    }
    
    .title {
      font-size: 1rem;
      color: black;
    }
  }

  > div > div {
    display: flex;
    justify-content: space-between;
  }
`;