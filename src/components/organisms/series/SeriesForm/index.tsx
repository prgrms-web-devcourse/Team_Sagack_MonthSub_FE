import React from 'react';
import type { ReactElement, FormHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Input, SectionTitle } from '@atom';
import { ImageUpload, ConfirmButtons } from '@molecules';
import { Flex } from '@templates';
import theme from '@styles/theme';
import { useForm } from '@hooks';
import { formatPriceAddComma, formatPriceToText } from '@utils/formatPrice';
import calculateLaterDate from '@utils/calculateLaterDate ';
import getToday from '@utils/getToday';
import createEmptyValueMessage from '@utils/createEmptyValueMessage';
import { UPLOAD_DATES, SERIES_CATEGORY } from '@constants';
import type { SeriesFormValueType } from '../../../../types';
import PeriodInput from './PeriodInput';
import SeriesEditor from './SeriesEditor';
import CategorySelect from './CategorySelect';
import DaySelect from './DaySelect';

interface SeriesFormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  edit: boolean;
  initialValues: SeriesFormValueType;
  onSubmit: (values: SeriesFormValueType) => void;
}

const SeriesForm = ({
  edit = false,
  initialValues,
  onSubmit,
  ...props
}: SeriesFormProps): ReactElement => {
  const {
    values,
    handleChange,
    handleChangeArr,
    handleSubmit,
    handleImageUpload,
  } = useForm({
    initialValues,
    onSubmit,
    validate: (values: SeriesFormValueType) => {
      const newErrors: { [key: string]: string } = {};
      for (const key in values) {
        if (!values[key]) {
          if (edit && key === 'thumbnailFile') {
            return;
          }
          newErrors.empty = createEmptyValueMessage(key);
          alert(newErrors.empty);
          break;
        } else if (key === 'uploadDate' && !Object.keys(values[key]).length) {
          newErrors.empty = createEmptyValueMessage(key);
          alert(newErrors.empty);
        }
      }

      if (
        edit &&
        Object.keys(initialValues.uploadDate).length !==
          Object.keys(values.uploadDate).length
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
          title="시리즈 소개"
        />
      </Section>
      <Section>
        <StyledFlex horizen justifyContent="space-between">
          <div>
            <SectionTitle size="medium">모집 기간</SectionTitle>
            <PeriodInput
              startName="subscribeStartDate"
              startValue={values.subscribeStartDate}
              startMin={String(getToday())}
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
            <PriceInput
              width="50%"
              type="text"
              value={formatPriceAddComma(values.price)}
              name="price"
              onChange={handleChange}
              min={0}
              disabled={edit}
              maxLength={10}
            />
            <PriceText>{`${formatPriceToText(values.price)}원`}</PriceText>
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

const PriceInput = styled(Input)`
  @media ${theme.device.mobileS} {
    width: 100%;
  }
`;

const PriceText = styled.span`
  display: inline-block;
  font-size: 1rem;
  margin: 0 0 0.3rem 0.3rem;
  vertical-align: bottom;
`;
