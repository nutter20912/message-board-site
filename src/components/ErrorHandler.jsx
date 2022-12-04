import { Button, Empty, message, Result } from 'antd';
import React, { useEffect } from 'react';
import { useAsyncError, useNavigate } from 'react-router-dom';
import { storage } from '../lib';

/**
 * 錯誤處理元件
 *
 * @returns {React.ReactElement}
 */
export function ErrorHandler() {
  const error = useAsyncError();
  const navigate = useNavigate();

  const { response: { status, data } } = error;

  const isUnauthenticated = () => (status === 401);

  useEffect(() => {
    message.error(data?.message || error.message);

    if (isUnauthenticated()) {
      storage.reset('user');
      message.info('請重新登入');
      navigate('/login');
    }
  }, []);

  return (
    <Empty description={false} />
  );
}

/**
 * 錯誤處理元件
 *
 * @returns {React.ReactElement}
 */
export function BaseErrorElement() {
  const navigate = useNavigate();

  const onClick = () => {
    storage.reset('user');
    message.info('請重新登入');
    navigate('/login');
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={onClick}>Back Home</Button>}
    />
  );
}
