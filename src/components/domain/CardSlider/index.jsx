import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const CardSlider = ({ list, itemsCountOnRow, itemsCountOnCol }) => {
  const howManyItemsAre = (itemsCountOnRow * itemsCountOnCol);
  // 출력할 list의 length / 한 슬라이드에 출력할 컨텐츠 정보(가로칸 * 세로줄) -1(인덱싱을 위한 개수-1)
  const lastSlideIndex = (Math.ceil(list.length / howManyItemsAre) - 1);
  const slideNumber = useRef(0);
  const [slideSequence, setSlideSequence] = useState(0);
  const slideRef = useRef([]);

  const slideSectionRender = useCallback(() => {
    const result = [];
    for (let i = 0; i <= lastSlideIndex; i += 1) {
      result.push(
        <SlideSectionArea key={`slide-${i}`} ref={el => { slideRef.current[i] = el }}>
          여기는 {i+1}번 슬라이드
        </SlideSectionArea>
      );
    }
    return result;
  }, []);

  const onIncrease = () => {
    if (slideNumber.current < lastSlideIndex) {
      setSlideSequence(slideSequence + 1);
      slideNumber.current += 1;
    }
  }

  const onDecrease = () => {
    if (slideNumber.current > 0) {
      setSlideSequence(slideSequence - 1);
      slideNumber.current -= 1;
    }
  }

  useEffect(() => {
    document.getElementById('slide').style.transform = `translateX(${-100 * slideNumber.current}%)`
  }, [slideSequence]);

  return (
    <SlideContainer>
      <SlideWrapper>
        <SlideFullArea id='slide'>
          {
            slideSectionRender()
          }
        </SlideFullArea>
      </SlideWrapper>

      <div className='slide-handler handler-left' onClick={() => {
        onDecrease();
      }}>
        <div>&#60;</div>
      </div>
      
      <div className='slide-handler handler-right' onClick={() => {
        onIncrease();
      }}>
        <div>&#62;</div>
      </div>
    </SlideContainer>
  );
}

CardSlider.defaultProps = {
  list: [],
  itemsCountOnRow: 4,
  itemsCountOnCol: 2,
}

CardSlider.propTypes = {
  list: PropTypes.array,
  itemsCountOnRow: PropTypes.number,
  itemsCountOnCol: PropTypes.number,
}

export default CardSlider;

const SlideContainer = styled.div`
  position: relative;

  .slide-handler {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    background-color: #bdbdbd;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .handler-left {
    left: -30px;
  }

  .handler-right {
    right: -30px;
  }
`;

const SlideWrapper = styled.div`
  overflow: hidden;
`;
  
const SlideFullArea = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transition: 0.25s ease-in-out;
`;

const SlideSectionArea = styled.div`
  width: 100%;
  min-height: 4rem;
  height: auto;
  flex-shrink:0;
  background-color: #eaeaea;
`;