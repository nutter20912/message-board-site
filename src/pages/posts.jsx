import { Spin } from 'antd';
import React, { Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Post } from '../components';

const { EditModal, PostList, TopCard } = Post;

/**
 * 文章頁面
 *
 * @param {ErrorElement} errorHandler
 * @returns {React.ReactElement}
 */
export default function Posts({ errorHandler: ErrorElement }) {
  const { reviews } = useLoaderData();
  const [editOpen, setEditOpen] = useState(false);
  const [targetId, setTargetId] = useState(false);

  const handleOpen = (postId) => {
    setEditOpen(true);
    setTargetId(postId);
  };

  return (
    <>
      <TopCard />
      <Suspense fallback={<Spin size="large" />}>
        <Await
          resolve={reviews}
          errorElement={<ErrorElement />}
        >
          <PostList handleOpen={handleOpen} />
        </Await>
      </Suspense>

      <EditModal
        open={editOpen}
        setOpen={setEditOpen}
        targetId={targetId}
      />
    </>
  );
}
