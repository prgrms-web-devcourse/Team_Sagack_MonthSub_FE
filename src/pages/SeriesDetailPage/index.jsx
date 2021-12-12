import React, { useEffect, useState } from 'react';
import { Wrapper, SeriesDetail } from '@components';
import { useParams } from 'react-router-dom';
import { getSeriesDetail } from '@apis/series';

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});

  const getInitialData = async () => {
    const response = await getSeriesDetail({ params: id });
    setDetails(response);
  };

  useEffect(() => {
    getInitialData();
  }, []);
  const getDetails = details.data;

  function isEmpty(data) {
    if (typeof data === 'undefined' || data === null || data === '')
      return true;
    return false;
  }

  if (isEmpty(getDetails) !== true) {
    return (
      <Wrapper>
        <SeriesDetail detail={getDetails} />
      </Wrapper>
    );
  }
  return '';
};

export default SeriesDetailPage;
