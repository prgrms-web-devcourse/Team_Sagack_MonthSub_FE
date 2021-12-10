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
import { GET, PUT, POST } from '../../apis/axios';

const UpdateSeriesPage = ({ match, history }) => {
  const { id } = match.params;
  const [file, setFile] = useState(null);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, setValues, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
      title: '',
      introduceText: '',
      introduceSentence: '',
      price: 0,
      subscribeStartDate: '',
      subscribeEndDate: '',
      seriesStartDate: '',
      seriesEndDate: '',
      category: '',
      uploadTime: '',
      articleCount: 0,
    },

    onSubmit: async values => {
      const PostData = {
        ...values,
        uploadDate: checkedInputs,
        articleCount: Number(values.articleCount),
        price: Number(values.price),
      };

      const PutData = {
        writeId: values.writeId,
        title: values.title,
        introduceText: values.introduceText,
        introduceSentence: values.introduceSentence,
        uploadDate: checkedInputs,
        uploadTime: values.uploadTime,
      };

      function jsonBlob(obj) {
        return new Blob([JSON.stringify(obj)], {
          type: 'application/json',
        });
      }
      const formData = new FormData();
      formData.append('thumbnail', file);
      formData.append('request', jsonBlob(id ? PutData : PostData));

      const response = id
        ? await PUT({
            url: `/series/edit/${id}`,
            isAuth: true,
            data: formData,
          })
        : await POST({
            url: '/series',
            isAuth: true,
            data: formData,
          });

      response.success && history.push(`/series/${id}`);
    },
    validate: values => {
      const newErrors = {};
      for (const key in values) {
        if (!values[key]) {
          newErrors.empty = `${key}의 값을 입력해주세요!`;
        } else if (checkedInputs.length === 0) {
          newErrors.day = '요일을 선택해주세요!';
        } else if (key === 'uploadDate') {
          if (values[key].length !== checkedInputs.length) {
            newErrors.dayLength = '요일 수가 일치하지 않습니다!';
          }
        }
      }
      return newErrors;
    },
  });

  const init = async id => {
    const response = await GET({
      url: `/series/${id}`,
      isAuth: false,
    });
    const seriesData = response.data.data.series;
    const uploadData = response.data.data.upload;
    const subscribeData = response.data.data.subscribe;

    setValues({
      writeId: response.data.data.writer.id,
      title: seriesData.title,
      introduceText: seriesData.introduceText,
      introduceSentence: seriesData.introduceSentence,
      price: seriesData.price,
      subscribeStartDate: subscribeData.startDate,
      subscribeEndDate: subscribeData.endDate,
      seriesStartDate: seriesData.startDate,
      seriesEndDate: seriesData.endDate,
      category: response.data.data.category,
      uploadTime: uploadData.time,
      articleCount: seriesData.articleCount,
      uploadDate: uploadData.date,
    });
    setCheckedInputs(uploadData.date);
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
      <ErrorMessage>{errors.empty}</ErrorMessage>
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
          <ImageUpload onChange={handleChangefile} title="이미지 업로드" />
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
            labels={['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun']}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
          <ErrorMessage>{errors.day}</ErrorMessage>
          <ErrorMessage>{errors.dayLength}</ErrorMessage>
        </Section>

        <ConfirmCancleButtons confirmName="제출" />
      </form>
    </StyledWrapper>
  );
};

UpdateSeriesPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default UpdateSeriesPage;

const StyledWrapper = styled(Wrapper)`
  padding: 9rem 0 4rem 0;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: #ffb15c;
`;
