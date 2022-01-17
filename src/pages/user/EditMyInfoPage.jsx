import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from '@hooks';
import { ImageUpload } from '@mocules';
import { Input, TextArea } from '@atom';
import { Wrapper } from '@templates';
import { useHistory } from 'react-router-dom';
import { getMyInfo, putMyInfo } from '@apis/user';
import theme from '@styles/theme';
import jsonBlob from '@utils/createJsonBlob';

const DEFAULT_PROFILE_IMAGE =
  'https://monthsub-image.s3.ap-northeast-2.amazonaws.com/users/default/defaultProfile.jpg';

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
    initialValues: {},
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
        await putMyInfo(formData);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    validate: ({ nickName, profileIntroduce }) => {
      const newErrors = {};
      if (!nickName) newErrors.nickName = '닉네임을 입력해주세요.';
      if (!profileIntroduce)
        newErrors.profileIntroduce = '소개글을 입력해주세요.';
      return newErrors;
    },
  });

  const getInitialData = async () => {
    const { data } = await getMyInfo();

    if (!data) {
      history.push('/server-error');
      return;
    }

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
    <Wrapper whole>
      <Form onSubmit={handleSubmit}>
        <H1>내 정보 수정</H1>
        <ImageUpload
          onChange={handleImageUpload}
          src={values.profileKeyUrl || DEFAULT_PROFILE_IMAGE}
          name="profileKey"
          circle
          id="profileKey"
          alt="미리보기"
          wide={+false}
        />
        <Label htmlFor="name">이름</Label>
        <Input
          width="100%"
          height="2.5rem"
          type="text"
          id="name"
          value={values.userName || ''}
          disabled
        />
        <Label htmlFor="nickName">닉네임</Label>
        <Input
          width="100%"
          height="2.5rem"
          type="text"
          id="nickName"
          name="nickName"
          value={values.nickName || ''}
          onChange={handleChange}
        />
        <ErrorMessage>{errors.nickName}&nbsp;</ErrorMessage>
        <Label htmlFor="introduce">소개글</Label>
        <TextArea
          width="100%"
          height="5rem"
          id="introduce"
          name="profileIntroduce"
          placeholder="한 줄 소개글이 없습니다."
          value={values.profileIntroduce || ''}
          onInput={handleChange}
        />
        <ErrorMessage>{errors.profileIntroduce}&nbsp;</ErrorMessage>
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
  box-shadow: ${theme.style.boxShadow};
  margin-top: ${theme.font.base};

  &:hover {
    background-color: ${theme.color.main};
    color: #041b1d;
  }
`;

const Label = styled.label`
  border: 0;
  margin: 2rem 0 0.6rem 0;
`;

const ErrorMessage = styled.span`
  color: ${theme.color.main};
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  margin-top: 3rem;
  justify-content: space-around;
`;
