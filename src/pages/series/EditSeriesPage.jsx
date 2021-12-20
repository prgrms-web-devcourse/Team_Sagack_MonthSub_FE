import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Wrapper,
  SeriesEditor,
  ImageUpload,
  ConfirmCancleButtons,
  Radio,
  CheckBox,
  Input,
  Period,
  Title,
  Loading,
} from '@components';
import { useForm } from '@hooks';
import calculateLaterDate from '@utils/calculateLaterDate ';
import convertSeriesInputName from '@utils/convertSeriesInputName';
import { putSeries, getSeriesDetail } from '@apis/series';
import jsonBlob from '@utils/createJsonBlob';
import { useParams, useHistory } from 'react-router-dom';

const EditSeriesPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [checkedInputs, setCheckedInputs] = useState([]);
  const { values, setValues, handleChange, handleSubmit, handleImageUpload } =
    useForm({
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
        thumbnailUrl: '',
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
          const formData = new FormData();
          formData.append('file', values.thumbnailFile);
          formData.append('request', jsonBlob(request));
          const response = await putSeries({
            id,
            data: formData,
          });
          response.status === 200 && history.push(`/series/${id}`);
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

  const getInitialData = async id => {
    const response = await getSeriesDetail({
      id,
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
      thumbnailUrl: series.thumbnail,
    });
    setCheckedInputs(upload.date);
    setLoading(false);
  };

  useEffect(() => {
    id && getInitialData(id);
  }, []);

  const handleSelectDays = (checked, value) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, value]);
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== value));
    }
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper styled={{ padding: '2rem 0' }}>
          <form onSubmit={handleSubmit}>
            <Section>
              <Radio
                names={[
                  'poem',
                  'novel',
                  'interview',
                  'essay',
                  'critique',
                  'etc',
                ]}
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
              <Title name="썸네일 선택" />
              <ImageUpload
                onChange={handleImageUpload}
                name="thumbnail"
                src={values.thumbnailUrl}
              />
            </Section>

            <Section>
              <Input
                width="22rem"
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
                width="22rem"
                title="연재 시간"
                type="time"
                name="uploadTime"
                value={values.uploadTime}
                onChange={handleChange}
              />
            </Section>

            <Section>
              <Input
                width="22rem"
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
        </Wrapper>
      )}
    </Container>
  );
};

export default EditSeriesPage;

const Container = styled.div`
  background-color: #fff;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;
