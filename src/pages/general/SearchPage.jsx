import React from 'react';
import styled from '@emotion/styled';
import {
  Input,
  Button,
  CardList,
  Wrapper,
  Icons,
  SectionTitle,
} from '@components';
import { getSearchWithTitle } from '@apis/search';
import { useForm } from '@hooks';
import theme from '@styles/theme';
import { useHistory } from 'react-router-dom';

const SearchPage = () => {
  const history = useHistory();
  const { values, setValues, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      keyword: '',
      check: '',
      seriesList: [],
    },
    onSubmit: async values => {
      const { data } = await getSearchWithTitle({
        check: values.check,
        keyword: values.keyword,
      });

      if (!data) {
        history.push('/server-error');
        return;
      }

      setValues({
        ...values,
        keyword: '',
        seriesList: data.seriesList,
      });
    },
    validate: ({ check, keyword }) => {
      const newErrors = {};
      if (!check) newErrors.error = '검색할 항목을 체크해주세요.';
      else if (!keyword) newErrors.error = '검색어를 입력해주세요.';
      return newErrors;
    },
  });

  return (
    <Wrapper whole>
      <SectionTitle>리스트 검색</SectionTitle>
      <SearchForm onSubmit={handleSubmit}>
        <div className="optionArea">
          <RadioSpan>
            <Input
              type="radio"
              name="check"
              value="title"
              onChange={handleChange}
              id="searchTitle"
            />
            <label htmlFor="searchTitle" className="optionTitle">
              제목
            </label>
          </RadioSpan>
          <RadioSpan>
            <Input
              type="radio"
              name="check"
              value="nickname"
              onChange={handleChange}
              id="searchNickname"
            />
            <label htmlFor="searchNickname" className="optionNickname">
              닉네임
            </label>
          </RadioSpan>
        </div>
        <div className="searchInputBox">
          <StyledInput
            width="100%"
            name="keyword"
            value={values.keyword || ''}
            onChange={handleChange}
            placeholder="검색어를 입력해주세요."
            round={false}
            focus={false}
          />
          <StyledButton type="submit" margin={0} round={false}>
            <Icons.Search />
          </StyledButton>
        </div>
        <ErrorMessage>{errors.error}&nbsp;</ErrorMessage>
      </SearchForm>
      {values.seriesList.length ? (
        <CardList list={values.seriesList} />
      ) : (
        <Noresult>검색결과가 없습니다.</Noresult>
      )}
    </Wrapper>
  );
};

export default SearchPage;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: ${theme.font.base};
  margin: 1rem 0 1.6rem 0;
`;

const SearchForm = styled.form`
  .optionArea {
    display: flex;
  }

  .searchInputBox {
    display: flex;
    margin-top: 20px;
  }
`;

const RadioSpan = styled.span`
  background-color: #ffffff;
  box-shadow: ${theme.style.boxShadow};
  height: 40px;
  width: 80px;
  overflow: hidden;
  border-radius: 40px;
  margin-right: 10px;

  > label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: ${theme.font.small};
  }

  > input {
    display: none;
  }

  #searchTitle:checked ~ .optionTitle {
    background-color: ${theme.color.main};
    color: #ffffff;
  }

  #searchNickname:checked ~ .optionNickname {
    background-color: ${theme.color.main};
    color: #ffffff;
  }
`;

const StyledInput = styled(Input)`
  border: none;
  height: 50px;
  font-size: ${theme.font.large};
  border: 2px solid ${theme.color.main};
  flex-grow: 1;
`;

const StyledButton = styled(Button)`
  border: 2px solid ${theme.color.main};
  border-left: none;
  width: 60px;
`;

const Noresult = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
