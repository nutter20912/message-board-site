import React from 'react';
import { HomeOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import { redirect } from 'react-router-dom';
import {
  BaseLayout,
  Login,
  Messages,
  Notifications,
  Posts,
  Register,
} from './pages';

// import { memory, storage } from '../js/utils';
// import { getCsrfCookie } from '../js/api';

export const menuComponents = [
  {
    path: '/',
    element: <Posts />,
    description: '首頁',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    path: 'messages',
    element: <Messages />,
    description: '訊息',
    key: 'messages',
    icon: <MessageOutlined />,
  },
  {
    path: 'notifications',
    element: <Notifications />,
    description: '通知',
    key: 'notifications',
    icon: <NotificationOutlined />,
  },
];

const isLogin = () => true;

export const routes = [
  {
    path: '/login',
    element: <Login />,
    loader: () => isLogin() && redirect('/'),
  },
  {
    path: '/register',
    element: <Register />,
    loader: () => isLogin() && redirect('/'),
  },
  {
    path: '/',
    element: <BaseLayout menuComponents={menuComponents} />,
    loader: () => !isLogin() && redirect('/login'),
    children: menuComponents,
  },
];