import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CardList, HottestList } from '@components';
import theme from '@styles/theme';

const CardSlider = ({ list, itemsCountOnRow, itemsCountOnCol, parentOf }) => {
  const howManyItemsAre = itemsCountOnRow * itemsCountOnCol;
  const lastSlideIndex = Math.ceil(list.length / howManyItemsAre) - 1;
  const slideNumber = useRef(0);
  const [slideSequence, setSlideSequence] = useState(0);
  const slideRef = useRef([]);
  const newList = [];
  const slideFullRef = useRef(null);

  if (list.length > 0) {
    // console.log(itemsCountOnRow);
  }

  const divideList = () => {
    for (let i = 0; i <= list.length; i += 1) {
      if (i === 0 || i % howManyItemsAre === 0) {
        newList.push(list.slice(i, i + howManyItemsAre));
      }
    }
  };

  divideList();

  const slideSectionRender = () => {
    const result = [];
    for (let i = 0; i <= lastSlideIndex; i += 1) {
      result.push(
        <SlideSectionArea
          id={`slide-${i + 1}`}
          key={`slide-${i}`}
          ref={el => {
            slideRef.current[i] = el;
          }}
        >
          {parentOf ? (
            <HottestList list={newList[i]} />
          ) : (
            <CardList list={newList[i]} />
          )}
        </SlideSectionArea>,
      );
    }
    return result;
  };

  const onIncrease = () => {
    if (slideNumber.current < lastSlideIndex) {
      setSlideSequence(slideSequence + 1);
      slideNumber.current += 1;
    }
  };

  const onDecrease = () => {
    if (slideNumber.current > 0) {
      setSlideSequence(slideSequence - 1);
      slideNumber.current -= 1;
    }
  };

  useEffect(() => {
    slideFullRef.current.style.transform = `translateX(${
      -100 * slideNumber.current
    }%)`;
  }, [slideSequence]);

  return (
    <SlideContainer>
      <SlideWrapper>
        <SlideFullArea ref={slideFullRef}>{slideSectionRender()}</SlideFullArea>
      </SlideWrapper>
      <div
        className="slide-handler handler-left"
        onClick={() => {
          onDecrease();
        }}
      >
        <div>&#60;</div>
      </div>
      <div
        className="slide-handler handler-right"
        onClick={() => {
          onIncrease();
        }}
      >
        <div>&#62;</div>
      </div>
    </SlideContainer>
  );
};

CardSlider.defaultProps = {
  list: [],
  itemsCountOnRow: 4,
  itemsCountOnCol: 1,
  parentOf: '',
};

CardSlider.propTypes = {
  list: PropTypes.array,
  itemsCountOnRow: PropTypes.number,
  itemsCountOnCol: PropTypes.number,
  parentOf: PropTypes.string,
};

export default CardSlider;

const SlideContainer = styled.div`
  position: relative;

  .slide-handler {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4rem;
    color: #000000;
    background: rgba(234, 234, 234, 0.6);
    box-shadow: ${theme.style.boxShadow};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .handler-left {
    left: 0;
  }

  .handler-right {
    right: 0;
  }
`;

const SlideWrapper = styled.div`
  overflow: hidden;
`;

const SlideFullArea = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transition: 0.3s ease-in-out;
`;

const SlideSectionArea = styled.div`
  width: 100%;
  min-height: 4rem;
  height: auto;
  flex-shrink: 0;
`;
