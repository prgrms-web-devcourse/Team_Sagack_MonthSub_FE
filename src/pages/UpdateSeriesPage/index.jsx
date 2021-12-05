import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Wrapper,
  SeriesEditor,
  Input,
  Upload,
  Button,
  Radio,
  CheckBox,
} from '@components';
import { useForm } from '@hooks';
import axios from 'axios';

const UpdateSeriesPage = () => {
  const [file, setFile] = useState();
  const [initialValues, setInitialValues] = useState({});
  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, handleChange, handleSubmit, errors } = useForm({
    dep: initialValues,
    onSubmit: async values => {
      const request = {
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
      formData.append('request', jsonBlob(request));

      try {
        const response = await axios({
          method: 'put',
          url: `http://52.79.51.188:8080/series/35`,
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoibW9udGhzdWIiLCJleHAiOjE2Mzg2OTc0OTgsImlhdCI6MTYzODY5Mzg5OCwidXNlcm5hbWUiOiJ1c2VyMSJ9.FLrQYlVxU9ejdtic9bgmBX5l-5jEPQfny83F2Bd0FpOuq18ZGYDBq3CHy3PsOH2YW7Y9hvqlO6KOW8w6IRdxNA',
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });
        if (response.status >= 400) {
          throw new Error('API 호출에 실패 했습니다.');
        }
        console.log(response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    },
    validate: values => {
      const newErrors = {};
      for (const key in values) {
        if (!values[key]) {
          newErrors.empty = `${key}의 값을 입력해주세요!`;
        } else if (checkedInputs.length === 0) {
          newErrors.day = '요일을 선택해주세요!';
        }
      }
      return newErrors;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `http://52.79.51.188:8080/series/7`,
          headers: {
            Authorization: '',
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        if (response.status >= 400) {
          throw new Error('API 호출에 실패 했습니다.');
        }
        const seriesData = response.data.data.series;
        const uploadData = response.data.data.upload;
        const subscribeData = response.data.data.subscribe;
        // console.log(response.data.data);
        // console.log(seriesData);
        // console.log(uploadData);
        // console.log(subscribeData);
        setInitialValues({
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
        });
        setCheckedInputs(uploadData.date);

        return response;
      } catch (error) {
        return error;
      }
    };
    init();
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
    <Wrapper>
      <ErrorMessage>{errors.empty}</ErrorMessage>
      <ErrorMessage>{errors.thumbnail}</ErrorMessage>
      <form onSubmit={handleSubmit}>
        <Radio
          names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
          onChange={handleChange}
          disabled
        />
        <SeriesEditor onChange={handleChange} value={values || ''} />
        <Upload name="thumbnail" onChange={handleChangefile}>
          <button type="button">Click me</button>
          <span>{file ? file.name : ''}</span>
        </Upload>
        <div>
          <h1>구독료</h1>
          <Input
            type="number"
            value={values.price || ''}
            name="price"
            onChange={handleChange}
            min={0}
            disabled
          />
        </div>
        <div>
          <h1> 모집 기간</h1>
          <Input
            type="date"
            value={values.subscribeStartDate || ''}
            name="subscribeStartDate"
            onChange={handleChange}
            disabled
          />
          <Input
            type="date"
            value={values.subscribeEndDate || ''}
            name="subscribeEndDate"
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <h1>연재 기간</h1>
          <Input
            type="date"
            name="seriesStartDate"
            value={values.seriesStartDate || ''}
            onChange={handleChange}
            disabled
          />
          <Input
            type="date"
            name="seriesEndDate"
            value={values.seriesEndDate || ''}
            onChange={handleChange}
            disabled
          />
        </div>
        <Input
          type="time"
          name="uploadTime"
          value={values.uploadTime || ''}
          title="연재시간"
          onChange={handleChange}
          disabled
        />
        <Input
          type="number"
          name="articleCount"
          value={values.articleCount || 0}
          title="총 회차"
          onChange={handleChange}
          min={1}
          disabled
        />
        {values.articleCount}
        <div>
          <h1>연재 요일</h1>
          <CheckBox
            labels={['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun']}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
        </div>
        <Button type="submit">제출</Button>
      </form>
    </Wrapper>
  );
};

export default UpdateSeriesPage;

const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: red;
`;
