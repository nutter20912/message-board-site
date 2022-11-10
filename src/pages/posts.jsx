import { Spin } from 'antd';
import React, { Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import EditModal from '../components/Post/EditModal';
import PostList from '../components/Post/PostList';

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
    <Suspense fallback={<Spin size="large" />}>
      <Await
        resolve={reviews}
        errorElement={<ErrorElement />}
      >
        <PostList handleOpen={handleOpen} />
      </Await>
      <EditModal
        open={editOpen}
        setOpen={setEditOpen}
        targetId={targetId}
      />
    </Suspense>
  );
}
