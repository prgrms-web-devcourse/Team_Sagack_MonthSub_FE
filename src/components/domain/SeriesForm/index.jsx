import React from 'react';
import { Editor, Input, Upload } from '@components';

const SeriesForm = () => (
  <form>
    <Editor />
    <Upload>
      {file => <button type="button">{file ? file.name : 'Click me'}</button>}
    </Upload>
    <div>
      <h1>구독료</h1>
      <Input type="range" name="price" />
    </div>
    <Input type="date" name="deadLine" title="모집 마감일" />
    <div>
      <h1>연재 기간</h1>
      <Input type="date" name="start" />
      <Input type="date" name="end" />
    </div>
    <Input type="time" name="start" title="연재시간" />
    <div>
      <h1>연재 요일</h1>
      <Input type="checkbox" name="date_Mon" />월
      <Input type="checkbox" name="date_Tue" />화
      <Input type="checkbox" name="date_Wen" />수
      <Input type="checkbox" name="date_Thu" />목
      <Input type="checkbox" name="date_Fri" />금
      <Input type="checkbox" name="date_Sat" />토
      <Input type="checkbox" name="date_Sun" />일
    </div>
  </form>
);

export default SeriesForm;
