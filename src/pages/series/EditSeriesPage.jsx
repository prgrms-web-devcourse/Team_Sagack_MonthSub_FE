import React, { useEffect, useState } from 'react';
import { Loading } from '@atom';
import { SeriesForm } from '@organisms';
import jsonBlob from '@utils/createJsonBlob';
import { Wrapper } from '@templates';
import { getSeriesDetail, putSeries } from '@apis/series';
import { useHistory, useParams } from 'react-router-dom';

const EditSeriesPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState();

  const getInitialData = async id => {
    const { data } = await getSeriesDetail({
      id,
    });

    if (!data) {
      setLoading(false);
      return;
    }

    const { series, upload, subscribe, category, writer } = data;
    setInitialValues({
      writeId: writer.id,
      title: series.title,
      introduceText: series.introduceText,
      introduceSentence: series.introduceSentence,
      price: series.price,
      subscribeStartDate: subscribe.startDate,
      subscribeEndDate: subscribe.endDate,
      seriesStartDate: series.startDate,
      seriesEndDate: series.endDate,
      category,
      uploadTime: upload.time,
      articleCount: series.articleCount,
      uploadDate: upload.date,
      thumbnailUrl: series.thumbnail,
    });

    setLoading(false);
  };

  useEffect(() => {
    id && getInitialData(id);
  }, [id]);

  const handleSubmit = async values => {
    try {
      const putSeriesForm = async values => {
        const putRequest = {
          writeId: values.writeId,
          title: values.title,
          introduceText: values.introduceText,
          introduceSentence: values.introduceSentence,
          uploadDate: values.uploadDate,
          uploadTime: values.uploadTime,
        };

        const formData = new FormData();
        formData.append('file', values.thumbnailFile);
        formData.append('request', jsonBlob(putRequest));
        const response = await putSeries({
          id,
          data: formData,
        });

        const { seriesId } = response.data;
        seriesId && history.push(`/series/${seriesId}`);
      };

      putSeriesForm(values);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <SeriesForm
          edit
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      )}
    </Wrapper>
  );
};

export default EditSeriesPage;
