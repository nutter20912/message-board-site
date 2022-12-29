import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import NotificationList from '../../components/Notification/NotificationList';

/**
 * 通知頁面
 *
 * @param {ErrorElement} errorHandler
 * @returns {React.ReactElement}
 */
export default function All({ errorHandler: ErrorElement }) {
  const { notifications } = useLoaderData();

  return (
    <Suspense fallback={<Spin size="large" />}>
      <Await
        resolve={notifications}
        errorElement={<ErrorElement />}
      >
        <NotificationList />
      </Await>
    </Suspense>
  );
}
