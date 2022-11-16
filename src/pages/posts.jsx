import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';
import { Post } from '../components';

const { PostList, TopCard } = Post;

/**
 * 文章頁面
 *
 * @param {ErrorElement} errorHandler
 * @returns {React.ReactElement}
 */
export default function Posts({ errorHandler: ErrorElement }) {
  const { reviews } = useLoaderData();

  return (
    <>
      <TopCard />
      <Suspense fallback={<Spin size="large" />}>
        <Await
          resolve={reviews}
          errorElement={<ErrorElement />}
        >
          <PostList />
          <Outlet />
        </Await>
      </Suspense>
    </>
  );
}
