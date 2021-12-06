import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
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

const { REACT_APP_API_END_POINT } = process.env;

const UpdateSeriesPage = () => {
  const history = useHistory();
  const [file, setFile] = useState(null);
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
          url: `${REACT_APP_API_END_POINT}/series/edit/32`,
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX0FVVEhPUiJdLCJpc3MiOiJtb250aHN1YiIsImV4cCI6MTYzODc5NDY1MCwiaWF0IjoxNjM4NzkxMDUwLCJ1c2VybmFtZSI6InVzZXIzIn0.9VhBPmmFD4XLNbYA_BE2h4umn6-prDh3Lgvnp_s-t0pWEExClKUTISHTk4MTKX8CC2pjlVMzEIsp8lVfWbSpCg',
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });
        if (response.status >= 400) {
          throw new Error('API 호출에 실패 했습니다.');
        }
        history.push(`/series/${response.data.data.seriesId}`);
        return response;
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
        } else if (key === 'uploadDate') {
          if (values[key].length !== checkedInputs.length) {
            newErrors.dayLength = '요일 수가 일치하지 않습니다!';
          }
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
          url: `${REACT_APP_API_END_POINT}/series/7`,
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
          uploadDate: uploadData.date,
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
      <form onSubmit={handleSubmit}>
        <StyledSection>
          <Title>카테고리</Title>
          <Radio
            names={['poem', 'novel', 'interview', 'essay', 'critique', 'etc']}
            onChange={handleChange}
            checkedButton={values.category}
            disabled
          />
        </StyledSection>
        <StyledSection>
          <Title>시리즈 소개</Title>
          <SeriesEditor onChange={handleChange} value={values} />
        </StyledSection>
        <StyledSection>
          <Title>이미지 업로드</Title>
          <StyledUpload
            name="thumbnail"
            onChange={handleChangefile}
            isFile={!!file}
          >
            <button type="button">File Select</button>
            <span>{file ? file.name : ''}</span>
          </StyledUpload>
        </StyledSection>
        <StyledSection>
          <Title>구독료</Title>
          <StyledInput
            type="number"
            value={values.price || 0}
            name="price"
            onChange={handleChange}
            min={0}
            disabled
          />
        </StyledSection>
        <StyledSection>
          <Title> 모집 기간</Title>
          <StyledInput
            type="date"
            value={values.subscribeStartDate || ''}
            name="subscribeStartDate"
            onChange={handleChange}
            disabled
          />
          <Line>-</Line>
          <StyledInput
            type="date"
            value={values.subscribeEndDate || ''}
            name="subscribeEndDate"
            onChange={handleChange}
            disabled
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 기간</Title>
          <StyledInput
            type="date"
            name="seriesStartDate"
            value={values.seriesStartDate || ''}
            onChange={handleChange}
            disabled
          />
          <Line>-</Line>
          <StyledInput
            type="date"
            name="seriesEndDate"
            value={values.seriesEndDate || ''}
            onChange={handleChange}
            disabled
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 시간</Title>
          <StyledInput
            type="time"
            name="uploadTime"
            value={values.uploadTime || ''}
            onChange={handleChange}
          />
        </StyledSection>
        <StyledSection>
          <Title>총 회차 </Title>
          <StyledInput
            type="number"
            name="articleCount"
            value={values.articleCount || 0}
            onChange={handleChange}
            min={1}
            disabled
          />
        </StyledSection>
        <StyledSection>
          <Title>연재 요일</Title>
          <CheckBox
            labels={['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun']}
            checkedInputs={checkedInputs}
            onChange={handleSelectDays}
          />
        </StyledSection>
        <ButtonWrapper>
          <StyledButton
            type="submit"
            width="8rem"
            onClick={() => history.goBack()}
          >
            취소
          </StyledButton>
          <StyledButton type="submit" width="8rem">
            제출
          </StyledButton>
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
};

export default UpdateSeriesPage;

const ErrorMessage = styled.span`
  margin: 1rem 0;
  color: red;
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

const StyledUpload = styled(Upload)`
  display: flex;
  align-items: center;
  button {
    width: 6.25rem;
    padding: 0.3rem;
    cursor: pointer;
    user-select: none;
    border-radius: 50px;
    border: none;
    margin-right: 0.5rem;
    color: ${({ isFile }) => (isFile ? '#ffb15c' : '#4b4b4b')};
    box-shadow: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
      0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
    background-color: #fff;
    text-align: center;
    &:hover {
      color: #ffb15c;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  margin: 0 1rem;
  background-color: #fff;
  color: #ffb15c;
  border: 0.0625rem solid #ffb15c;
  &:hover {
    color: #fff;
    background-color: #ffb15c;
  }
`;
