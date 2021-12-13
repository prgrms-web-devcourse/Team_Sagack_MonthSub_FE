import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, SeriesDetail } from '@components';
import { useParams } from 'react-router-dom';
import { getSeriesDetail } from '@apis/series';

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const isEmptyRef = useRef(true);

  const getInitialData = async () => {
    const { data } = await getSeriesDetail({ params: id });
    setDetails(data);
  };

  const isEmpty = param => {
    if (!param) {
      isEmptyRef.current = true;
    }
    isEmptyRef.current = false;
  };

  useEffect(() => {
    getInitialData();
    isEmpty(details);
  }, []);

  return (
    !isEmptyRef.current && (
      <Wrapper>
        <SeriesDetail detail={details} />
      </Wrapper>
    )
  );
};

export default SeriesDetailPage;
