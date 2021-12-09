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
} from '@components';
import { useForm } from '@hooks';
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

      id
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

      history.push(`/series/${id}`);
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

  const createLaterDate = (currentDate, n) => {
    const arr = currentDate.split('-');
    const laterDate = new Date(
      Number(arr[0]),
      Number(arr[1]) - 1,
      Number(arr[2]),
    );
    laterDate.setDate(laterDate.getDate() + n);
    const year = laterDate.getFullYear();
    const month = laterDate.getMonth() + 1;
    const date = laterDate.getDate();
    return `${year}-${month >= 10 ? month : `0${month}`}-${
      date >= 10 ? date : `0${date}`
    }`;
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
      <form onSubmit={handleSubmit}>
        <StyledSection>
          <Title>카테고리</Title>
          <Radio
            names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
            onChange={handleChange}
            checkedButton={values.category}
            disabled={id}
          />
        </StyledSection>
        <StyledSection>
          <Title>시리즈 소개</Title>
          <SeriesEditor onChange={handleChange} value={values} />
        </StyledSection>
        <StyledSection>
          <Title>이미지 업로드</Title>
          <ImageUpload onChange={handleChangefile} />
        </StyledSection>
        <StyledSection>
          <Title>구독료</Title>
          <StyledInput
            type="number"
            value={values.price}
            name="price"
            onChange={handleChange}
            min={0}
            disabled={id}
          />
        </StyledSection>
        <StyledSection>
          <Title> 모집 기간</Title>
          <StyledInput
            type="date"
            value={values.subscribeStartDate}
            name="subscribeStartDate"
            onChange={handleChange}
            disabled={id}
          />
          <Line>-</Line>
          <StyledInput
            type="date"
            value={values.subscribeEndDate}
            name="subscribeEndDate"
            onChange={handleChange}
            disabled={id}
            min={createLaterDate(values.subscribeStartDate, 1)}
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 기간</Title>
          <StyledInput
            type="date"
            name="seriesStartDate"
            value={values.seriesStartDate}
            onChange={handleChange}
            disabled={id}
            min={createLaterDate(values.subscribeEndDate, 1)}
          />
          <Line>-</Line>
          <StyledInput
            type="date"
            name="seriesEndDate"
            value={values.seriesEndDate}
            onChange={handleChange}
            disabled={id}
            min={createLaterDate(values.seriesStartDate, 1)}
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 시간</Title>
          <StyledInput
            type="time"
            name="uploadTime"
            value={values.uploadTime}
            onChange={handleChange}
          />
        </StyledSection>
        <StyledSection>
          <Title>총 회차 </Title>
          <StyledInput
            type="number"
            name="articleCount"
            value={values.articleCount}
            onChange={handleChange}
            min={1}
            disabled={id}
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 요일</Title>
          <CheckBox
            labels={['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun']}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
          <ErrorMessage>{errors.day}</ErrorMessage>
          <ErrorMessage>{errors.dayLength}</ErrorMessage>
        </StyledSection>
        <ConfirmCancleButtons confirmName="제출" />
      </form>
    </Wrapper>
  );
};

UpdateSeriesPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default UpdateSeriesPage;
const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: #ffb15c;
`;
const Line = styled.span`
  padding: 0 0.3rem;
`;
const Title = styled.h1`
  margin-bottom: 1rem;
  font-weight: 700;
`;
const StyledInput = styled(Input)`
  margin-top: 0;
`;
const StyledSection = styled.section`
  margin-bottom: 3rem;
`;
