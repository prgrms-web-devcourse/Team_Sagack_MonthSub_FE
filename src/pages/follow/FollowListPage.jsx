import React, { useState, useEffect, useRef } from 'react';
// import styled from '@emotion/styled';
import { getMyFollowList, getOtherFollowList } from '@apis/follow';
import { Wrapper } from '@components';
import { useParams } from 'react-router-dom';

const initialValues = [
  {
    followCount: 0,
    nickname: '',
    profileKey: '',
    profileIntroduce: '',
  },
];

const FollowListPage = () => {
  const { id } = useParams();
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef();
  const [values, setValues] = useState(initialValues);

  const getData = async () => {
    if (!id) {
      const response = await getMyFollowList({
        params: {
          lastId: null,
          size: 10,
        },
      });
      setValues(response.data);
    } else {
      const response = await getOtherFollowList({
        id,
        params: {
          lastId: null,
          size: 10,
        },
      });
      setValues(response.data);
      // eslint-disable-next-line no-console
      console.log(values);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          getData();
        }
      },
      { threshold: 0.25, rootMargin: '100%' },
    );
    bottomObserver.current = observer;
  }, []);

  useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  return (
    <Wrapper>
      <div ref={setBottom} />
      {}
    </Wrapper>
  );
};

export default FollowListPage;

// const Div = styled.div`
//   height: 50vh;
//   border: #000000 1px solid;
// `;
