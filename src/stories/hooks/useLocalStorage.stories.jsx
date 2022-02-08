import React from 'react';
import { useLocalStorage } from '@hooks';

export default {
  title: 'Hook/useLocalStorage',
};

export const Default = () => {
  const [status, setStatus] = useLocalStorage('status', '404 NOT FOUND');
  return (
    <div>
      <button type="button" onClick={() => setStatus('200 ok')}>
        Resend
      </button>
      <p>status : {status}</p>
    </div>
  );
};
