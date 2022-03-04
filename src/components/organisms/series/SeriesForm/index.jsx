import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input, SectionTitle } from '@atom';
import { ImageUpload, ConfirmButtons } from '@molecules';
import { Flex } from '@templates';
import theme from '@styles/theme';
import { useForm } from '@hooks';
import { formatPrice, formatPriceToText } from '@utils/formatPrice';
import calculateLaterDate from '@utils/calculateLaterDate ';
import getToday from '@utils/getToday';
import createEmptyValueMessage from '@utils/createEmptyValueMessage';
import { UPLOAD_DATES, SERIES_CATEGORY } from '@constants';
import PeriodInput from './PeriodInput';
import SeriesEditor from './SeriesEditor';
import CategorySelect from './CategorySelect';
import DaySelect from './DaySelect';

const SeriesForm = ({ edit, initialValues, onSubmit, ...props }) => {
  const {
    values,
    handleChange,
    handleChangeArr,
    handleSubmit,
    handleImageUpload,
  } = useForm({
    initialValues,
    onSubmit,
    validate: values => {
      const newErrors = {};

      for (const key in values) {
        if (!values[key] || values[key].length === 0) {
          if (edit && key === 'thumbnailFile') {
            return;
          }
          newErrors.empty = createEmptyValueMessage(key);
          alert(newErrors.empty);
          break;
        }
      }

      if (
        edit &&
        initialValues.uploadDate.length !== values.uploadDate.length
      ) {
        newErrors.dayLength = '요일 수가 일치하지 않습니다!';
        alert(newErrors.dayLength);
      }

      return newErrors;
    },
  });

  return (
    <form onSubmit={handleSubmit} {...props}>
      <ImageUpload
        onChange={handleImageUpload}
        name="thumbnail"
        src={values.thumbnailUrl}
        wide={+true}
      />

      <Section>
        <SectionTitle size="medium">카테고리</SectionTitle>
        <CategorySelect
          name="category"
          labels={SERIES_CATEGORY}
          onChange={handleChange}
          checkedItem={values.category}
          disabled={edit}
        />
      </Section>
      <Section>
        <SeriesEditor
          onChange={handleChange}
          value={values}
          Sectiontitle="시리즈 소개"
        />
      </Section>
      <Section>
        <StyledFlex horizen justifyContent="space-between">
          <div>
            <SectionTitle size="medium">모집 기간</SectionTitle>
            <PeriodInput
              startName="subscribeStartDate"
              startValue={values.subscribeStartDate}
              startMin={getToday()}
              endName="subscribeEndDate"
              endValue={values.subscribeEndDate}
              endMin={calculateLaterDate(values.subscribeStartDate, 1)}
              onChange={handleChange}
              disabled={edit}
            />
          </div>
          <div>
            <SectionTitle size="medium">연재 기간</SectionTitle>
            <PeriodInput
              startName="seriesStartDate"
              startValue={values.seriesStartDate}
              startMin={calculateLaterDate(values.subscribeEndDate, 1)}
              endName="seriesEndDate"
              endValue={values.seriesEndDate}
              endMin={calculateLaterDate(values.seriesStartDate, 1)}
              onChange={handleChange}
              disabled={edit}
            />
          </div>
        </StyledFlex>
      </Section>
      <Section>
        <StyledFlex horizen justifyContent="space-between">
          <div>
            <SectionTitle size="medium">연재 시간</SectionTitle>
            <Input
              width="100%"
              type="time"
              name="uploadTime"
              value={values.uploadTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <SectionTitle size="medium">총 회차</SectionTitle>
            <Input
              width="100%"
              type="number"
              name="articleCount"
              value={values.articleCount}
              onChange={handleChange}
              min={1}
              disabled={edit}
            />
          </div>
        </StyledFlex>
      </Section>

      <Section>
        <StyledFlex horizen>
          <div>
            <SectionTitle size="medium">구독료</SectionTitle>
            <PayInput
              width="50%"
              type="text"
              value={formatPrice(values.price)}
              name="price"
              onChange={handleChange}
              min={0}
              disabled={edit}
            />
            <span>{`${formatPriceToText(values.price)}원`}</span>
          </div>
        </StyledFlex>
      </Section>

      <Section>
        <SectionTitle size="medium">연재 요일</SectionTitle>
        <DaySelect
          initialCheckeds={values.uploadDate}
          valueList={UPLOAD_DATES}
          onChange={handleChangeArr}
        />
      </Section>
      <ConfirmButtons confirmName="제출" />
    </form>
  );
};

SeriesForm.defaultProps = {
  edit: false,
  initialValues: {},
  onSubmit: () => {},
};

SeriesForm.propTypes = {
  edit: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default SeriesForm;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const StyledFlex = styled(Flex)`
  & > div {
    width: 100%;
  }
  @media ${theme.device.mobileS} {
    flex-direction: column;
    align-items: flex-start;
  }

  & > div:first-of-type {
    margin-right: 4rem;
    @media ${theme.device.mobileS} {
      margin-right: 0;
      margin-bottom: 3rem;
    }
  }
`;

const PayInput = styled(Input)`
  @media ${theme.device.mobileS} {
    width: 100%;
  }
`;
