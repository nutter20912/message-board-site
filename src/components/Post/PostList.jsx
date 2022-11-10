import { EllipsisOutlined, ExclamationCircleOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, Modal } from 'antd';
import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { Post } from '../../api';
import { storage } from '../../lib';

/**
 * 貼文卡片元件
 *
 * @returns {React.ReactElement}
 */
export default function PostList({ handleOpen }) {
  const { data } = useAsyncValue();
  const user = storage.get('user');

  const showDeleteConfirm = (postId) => {
    Modal.confirm({
      title: 'Are you sure delete this post?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        Post.delete({ id: postId });
      },
    });
  };

  const getItems = (postId) => [
    {
      label: 'update',
      key: '0',
      onClick: () => handleOpen(postId),
    },
    {
      label: 'delete',
      key: '1',
      onClick: () => showDeleteConfirm(postId),
    },
  ];

  const getCardTitle = ({ id: postId, user: { id: userId, name } }) => (
    <>
      <Avatar icon={<UserOutlined />} />
      <span style={{ marginLeft: '10px' }}>{name}</span>
      <Dropdown
        menu={{ items: getItems(postId) }}
        trigger={['click']}
        placement="bottomRight"
        disabled={(userId !== user.id)}
      >
        <Button
          style={{ float: 'right' }}
          icon={<EllipsisOutlined />}
          type="link"
        />
      </Dropdown>
    </>
  );

  return data?.map((post) => (
    <Card
      style={{ borderRadius: '10px', margin: '10px' }}
      className="content-card"
      bordered={false}
      key={post.id}
      title={getCardTitle(post)}
      actions={[
        <MessageOutlined key="comment" />,
      ]}
    >
      <h3>{post.title}</h3>
      {post.content}
    </Card>
  ));
}
