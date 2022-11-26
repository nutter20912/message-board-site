import { Divider, Modal, Spin } from 'antd';
import React, { Suspense, useState } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { Post as PostComponents } from '../components';

const { PostCard, CommentsBlock } = PostComponents;

/**
 * 貼文頁
 *
 * @returns {React.ReactElement}
 */
export default function Post({ errorHandler: ErrorElement }) {
  const { post, comments } = useLoaderData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const onCancel = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <Modal
      open={open}
      footer={false}
      onCancel={onCancel}
    >
      <Suspense fallback={<Spin />}>
        <Await
          resolve={post}
          errorElement={<ErrorElement />}
        >
          <PostCard />
        </Await>
      </Suspense>

      <Divider plain />

      <Suspense fallback={<Spin />}>
        <Await
          resolve={comments}
          errorElement={<ErrorElement />}
        >
          <CommentsBlock />
        </Await>
      </Suspense>
    </Modal>
  );
}