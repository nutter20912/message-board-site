import { NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import { defer } from 'react-router-dom';
import { Notification } from '../../api';
import { ErrorHandler } from '../../components';
import All from './all';

export default {
  path: 'notifications',
  element: <All errorHandler={ErrorHandler} />,
  description: '通知',
  key: 'notifications',
  icon: <NotificationOutlined />,
  loader: async () => {
    const notifications = Notification.getIndex();
    return defer({ notifications });
  },
};
