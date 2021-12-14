import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from '@hooks';
import { Input, Wrapper, ImageUpload } from '@components';
import { useHistory } from 'react-router-dom';
import { getMyInfo, patchMyInfo } from '@apis/user';
import theme from '@styles/theme';
import jsonBlob from '@utils/createJsonBlob';

const EditMyInfoPage = () => {
  const history = useHistory();
  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
    handleImageUpload,
  } = useForm({
    initialValues: {
      userName: '',
      nickName: '',
      profileIntroduce: '',
      profileKeyUrl: '',
      profileKeyFile: {},
    },
    onSubmit: async requestData => {
      const formData = new FormData();
      formData.append('file', requestData.profileKeyFile);
      formData.append(
        'request',
        jsonBlob({
          nickName: requestData.nickName,
          profileIntroduce: requestData.profileIntroduce,
        }),
      );
      try {
        patchMyInfo(formData);
      } catch (error) {
        alert(error);
      }
    },
    validate: ({ nickName }) => {
      const newErrors = {};
      if (!nickName) newErrors.nickName = '닉네임을 입력해주세요.';
      return newErrors;
    },
  });

  const getInitialData = async () => {
    const { data } = await getMyInfo();
    setValues({
      userName: data.userName,
      nickName: data.nickName,
      profileIntroduce: data.profileIntroduce,
      profileKeyUrl: data.profileKey,
    });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <H1>내 정보 수정</H1>
        <ImageUpload
          onChange={handleImageUpload}
          src={values.profileKeyUrl}
          name="profileKey"
          circle
          id="profileKey"
          alt="미리보기"
        />
        <Label htmlFor="name">이름</Label>
        <Input
          width="100%"
          height="2.5rem"
          type="text"
          id="userName"
          value={values.userName || ''}
          disabled
        />
        <Label htmlFor="nickName">닉네임</Label>
        <Input
          type="text"
          id="nickName"
          width="100%"
          height="2.5rem"
          name="nickName"
          value={values.nickName || ''}
          onChange={handleChange}
        />
        <ErrorMessage>{errors.nickName}&nbsp;</ErrorMessage>
        <Label htmlFor="introduce">소개글</Label>
        <TextArea
          type="text"
          width="100%"
          height="2.5rem"
          id="introduce"
          name="profileIntroduce"
          placeholder="한 줄 소개글이 없습니다."
          value={values.profileIntroduce || ''}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button type="submit" onClick={handleSubmit}>
            확인
          </Button>
          <Button type="submit" onClick={() => history.push('/')}>
            취소
          </Button>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

export default EditMyInfoPage;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4rem;
`;

const Form = styled.form`
  width: 60%;
  height: 100%;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 40%;
  height: 2.5rem;
  outline: 0;
  border: 0;
  background-color: #041b1d;
  color: #ffffff;
  border-radius: 0.25rem;
  ${theme.style
    .boxShadow}: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-top: ${theme.font.base};

  &:hover {
    background-color: ${theme.color.main};
    color: #041b1d;
  }
`;

const Label = styled.label`
  border: 0;
  margin-top: ${theme.font.base};
`;

const ErrorMessage = styled.span`
  color: ${theme.color.main}
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;

// const ProfileImage = styled(Image)`
//   border-radius: 50%;
//   width: 10rem;
//   height: 10rem;
// `;

const TextArea = styled.textarea`
  width: ${({ width }) => (typeof width === 'number' ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}rem` : height};
  padding: 0.2rem;
  border: #041b1d 0.063rem;
  background-color: #ffffff;
  ${theme.style.boxShadow}: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
    0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  &:focus {
    background-color: #ffffff;
    border: #041b1d 0.063rem;
    ${theme.style.boxShadow}: 0 0.25rem 0.375rem rgba(50, 50, 93, 0.11),
      0 0.063rem 0.188rem rgba(0, 0, 0, 0.08);
  }
  margin: 0.3rem 0;
  resize: none;
`;
