import React from 'react';
import { useSessionStorage } from '@hooks';

export default {
  title: 'Hook/useSessionStorage',
};

export const Default = () => {
  const [status, setStatus] = useSessionStorage('status', '404 NOT FOUND');
  return (
    <div>
      <button type="button" onClick={() => setStatus('200 ok')}>
        Resend
      </button>
      <p>status : {status}</p>
    </div>
  );
};
