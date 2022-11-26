import {
  EllipsisOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, message, Modal } from 'antd';
import React, { useState } from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { Post } from '../../api';
import { storage } from '../../lib';
import EditModal from './EditModal';

/**
 * 貼文卡片列表元件
 *
 * @returns {React.ReactElement}
 */
export default function PostList() {
  const user = storage.get('user');
  const { data } = useAsyncValue();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [targetId, setTargetId] = useState(false);

  const getDropdownItems = (postId) => [
    {
      label: '編輯貼文',
      key: '0',
      onClick: () => {
        setEditOpen(true);
        setTargetId(postId);
      },
    },
    {
      label: '刪除貼文',
      key: '1',
      onClick: () => {
        Modal.confirm({
          title: 'Are you sure delete this post?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: async () => {
            await Post.delete({ id: postId });
            message.info('刪除成功');
            navigate('/');
          },
        });
      },
    },
  ];

  const getCardTitle = ({ id: postId, user: { id: userId, name } }) => (
    <>
      <Avatar icon={<UserOutlined />} />
      <span style={{ marginLeft: '10px' }}>{name}</span>
      <Dropdown
        menu={{ items: getDropdownItems(postId) }}
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

  return (
    <>
      <EditModal
        open={editOpen}
        setOpen={setEditOpen}
        targetId={targetId}
      />
      {data?.map((post) => (
        <Card
          style={{ margin: '10px' }}
          className="content-card"
          key={post.id}
          title={getCardTitle(post)}
          actions={[
            <MessageOutlined onClick={() => navigate(`/posts/${post.id}`)} />,
          ]}
        >
          <h3>{post.title}</h3>
          {post.content}
        </Card>
      ))}
    </>
  );
}
