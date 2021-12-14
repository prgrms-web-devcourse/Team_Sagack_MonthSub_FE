import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  Wrapper,
  SeriesEditor,
  ImageUpload,
  ConfirmCancleButtons,
  Radio,
  CheckBox,
  Input,
  Period,
} from '@components';
import { useForm } from '@hooks';
import calculateLaterDate from '@utils/calculateLaterDate ';
import convertSeriesInputName from '@utils/convertSeriesInputName';
import { putSeries, getSeriesDetail, putSeriesImage } from '@apis/series';
import jsonBlob from '@utils/createJsonBlob';

const EditSeriesPage = ({ match, history }) => {
  const { id } = match.params;
  const [file, setFile] = useState(null);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      introduceText: '',
      introduceSentence: '',
      price: '',
      subscribeStartDate: '',
      subscribeEndDate: '',
      seriesStartDate: '',
      seriesEndDate: '',
      category: '',
      uploadTime: '',
      articleCount: '',
      thumbnail: '',
    },

    onSubmit: async values => {
      try {
        const request = {
          writeId: values.writeId,
          title: values.title,
          introduceText: values.introduceText,
          introduceSentence: values.introduceSentence,
          uploadDate: checkedInputs,
          uploadTime: values.uploadTime,
        };

        const textResponse = await putSeries({
          data: jsonBlob(request),
          params: id,
        });

        if (file) {
          const fileForm = new FormData();
          fileForm.append('file', file);

          const fileResponse = await putSeriesImage({
            data: fileForm,
            params: id,
          });
          textResponse.status === 200 &&
            fileResponse.status === 200 &&
            history.push(`/series/${id}`);
        } else {
          textResponse.status === 200 && history.push(`/series/${id}`);
        }
      } catch (error) {
        alert(error);
      }
    },
    validate: values => {
      const newErrors = {};
      for (const key in values) {
        if (!values[key]) {
          newErrors.empty = `${convertSeriesInputName(key)}를 입력해주세요!`;
          alert(`${convertSeriesInputName(key)}를 입력해주세요!`);
          break;
        }
      }
      if (values.uploadDate.length !== checkedInputs.length) {
        newErrors.dayLength = '요일 수가 일치하지 않습니다!';
        alert('요일 수가 일치하지 않습니다!');
      }
      return newErrors;
    },
  });

  const init = async id => {
    const response = await getSeriesDetail({
      params: id,
    });
    const { series, upload, subscribe, category, writer } = response.data;

    setValues({
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
      thumbnail: series.thumbnail,
    });
    setCheckedInputs(upload.date);
  };

  useEffect(() => {
    id && init(id);
  }, []);

  const handleChangefile = file => {
    file && setFile(file);
  };

  const handleSelectDays = (checked, value) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, value]);
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== value));
    }
  };
  return (
    <StyledWrapper styled={{ padding: '2rem 0' }}>
      <form onSubmit={handleSubmit}>
        <Section>
          <Radio
            names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
            onChange={handleChange}
            checkedButton={values.category}
            disabled={!!id}
            title="카테고리"
          />
        </Section>

        <Section>
          <SeriesEditor
            onChange={handleChange}
            value={values}
            title="시리즈 소개"
          />
        </Section>

        <Section>
          <ImageUpload
            onChange={handleChangefile}
            title="이미지 업로드"
            url={values.thumbnail}
          />
        </Section>

        <Section>
          <Input
            title="구독료"
            type="number"
            value={values.price}
            name="price"
            onChange={handleChange}
            min={0}
            disabled={!!id}
          />
        </Section>

        <Section>
          <Period
            title="모집기간"
            startName="subscribeStartDate"
            startValue={values.subscribeStartDate}
            startMin=""
            endName="subscribeEndDate"
            endValue={values.subscribeEndDate}
            endMin={calculateLaterDate(values.subscribeStartDate, 1)}
            onChange={handleChange}
            pageParam={id}
          />
        </Section>

        <Section>
          <Period
            title="연재기간"
            startName="seriesStartDate"
            startValue={values.seriesStartDate}
            startMin={calculateLaterDate(values.subscribeEndDate, 1)}
            endName="seriesEndDate"
            endValue={values.seriesEndDate}
            endMin={calculateLaterDate(values.seriesStartDate, 1)}
            onChange={handleChange}
            pageParam={id}
          />
        </Section>

        <Section>
          <Input
            title="연재 시간"
            type="time"
            name="uploadTime"
            value={values.uploadTime}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Input
            title="총 회차"
            type="number"
            name="articleCount"
            value={values.articleCount}
            onChange={handleChange}
            min={1}
            disabled={!!id}
          />
        </Section>

        <Section>
          <CheckBox
            title="연재 요일"
            labels={[
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ]}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
        </Section>

        <ConfirmCancleButtons confirmName="제출" />
      </form>
    </StyledWrapper>
  );
};

EditSeriesPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default EditSeriesPage;

const StyledWrapper = styled(Wrapper)`
  padding: 9rem 0 4rem 0;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;
