import { HomeOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import { createBrowserRouter, defer, redirect, RouterProvider } from 'react-router-dom';
import { Post } from './api';
import { ErrorHandler, isLogin } from './components/ErrorHandler';
import { BaseLayout, Login, Messages, Notifications, Posts, Register } from './pages';

/**
 * 路由元件
 *
 * @returns {RouterProvider}
 */
export default function Router() {
  const menuComponents = [
    {
      path: '/',
      element: <Posts errorHandler={ErrorHandler} />,
      description: '首頁',
      key: 'home',
      icon: <HomeOutlined />,
      loader: async () => {
        const reviews = Post.getIndex();

        return defer({ reviews });
      },
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

  const routes = [
    {
      path: '/',
      element: <BaseLayout menuComponents={menuComponents} />,
      children: menuComponents,
    },
    {
      path: 'login',
      element: <Login />,
      loader: () => isLogin() && redirect('/'),
    },
    {
      path: 'register',
      element: <Register />,
      loader: () => isLogin() && redirect('/'),
    },
  ];

  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}
