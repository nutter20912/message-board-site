import React from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { BaseErrorElement, isLogin } from './components';
import { BaseLayout, Login, messages, notifications, posts } from './pages';

/**
 * 路由元件
 *
 * @returns {RouterProvider}
 */
export default function Router() {
  const menuComponents = [
    {
      ...posts,
      path: '/',
    },
    {
      ...messages,
      path: '/messages',
    },
    {
      ...notifications,
      path: '/notifications',
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
