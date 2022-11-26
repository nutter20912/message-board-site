import { HomeOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import { createBrowserRouter, defer, redirect, RouterProvider } from 'react-router-dom';
import * as api from './api';
import { BaseErrorElement, ErrorHandler, isLogin } from './components';
import { BaseLayout, Login, Messages, Notifications, Post, Posts } from './pages';

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
        const reviews = api.Post.getIndex();

        return defer({ reviews });
      },
      children: [
        {
          path: '/posts/:postId',
          element: <Post errorHandler={ErrorHandler} />,
          description: 'post',
          key: 'post',
          loader: async ({ params }) => {
            const post = api.Post.show({ id: params.postId });
            const comments = api.Comment.all({ postId: params.postId });

            return defer({ post, comments });
          },
        },
      ],
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
      errorElement: <BaseErrorElement />,
    },
    {
      path: 'login',
      element: <Login />,
      loader: () => isLogin() && redirect('/'),
    },
  ];

  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}
