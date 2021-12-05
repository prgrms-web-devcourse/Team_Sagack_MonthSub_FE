import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  SeriesDetail,
} from '@components';
import { useParams } from 'react-router-dom';
import { getSeries } from '@apis/series'
// import dummy from './seriesDetail.json';

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  useEffect(async () => setDetails(await getSeries({url: `/series/${id}`})), []);
  const getDetails = details.data;

  function isEmpty(data){
    if(typeof data === "undefined" || data === null || data === "")
        return true;
    return false;
  }

  if (isEmpty(getDetails) !== true) {
    return (
      <Wrapper>
        <SeriesDetail detail={ getDetails } />
      </Wrapper>
    );
  } return "";
}

export default SeriesDetailPage;