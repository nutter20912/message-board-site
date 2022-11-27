import {
  CloseOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, List, message, Modal, Spin, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useAsyncValue, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../../api';
import { datetime, storage } from '../../lib';
import CommentInput from './CommentInput';

const CommentAvatar = styled(Avatar)`
  margin: 5px;
`;

/**
 * 評論區域元件
 *
 * @returns {React.ReactElement}
 */
export default function CommentsBlock() {
  const user = storage.get('user');
  const { data = [], paginator } = useAsyncValue();
  const [comments, setComments] = useState(data);
  const [targetId, setTargetId] = useState(false);
  const [storeSpinning, setStoreSpinning] = useState(false);
  const [updateSpinning, setUpdateSpinning] = useState(false);
  const { postId } = useParams();

  const getDropdownItems = (commentId) => [
    {
      label: 'update',
      key: '0',
      onClick: () => {
        setTargetId(commentId);
      },
    },
    {
      label: 'delete',
      key: '1',
      onClick: () => {
        Modal.confirm({
          title: 'Are you sure delete this post?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: async () => {
            await api.Comment.delete({ id: commentId });
            message.info('刪除成功');

            setComments((pre) => pre.filter((comment) => comment.id !== commentId));
          },
        });
      },
    },
  ];

  const firstItem = {
    datetime: '',
    content: (
      <Tooltip title="Enter 送出">
        <CommentAvatar gap="10" icon={<UserOutlined />} />
        <Spin spinning={storeSpinning} wrapperClassName="comment-input-spin">
          <CommentInput
            targetId={postId}
            setComments={setComments}
            action="store"
            setSpinning={setStoreSpinning}
          />
        </Spin>
      </Tooltip>
    ),
  };

  const generateItem = (comment) => ({
    author: <b>{comment.user.name}</b>,
    avatar: <CommentAvatar>{comment.user.name[0].toUpperCase()}</CommentAvatar>,
    content: (
      <>
        {targetId !== comment.id && comment.content}
        {targetId === comment.id && (
          <Spin spinning={updateSpinning} wrapperClassName="comment-input-spin">
            <CommentInput
              targetId={targetId}
              value={comment.content}
              setComments={setComments}
              action="update"
              setSpinning={setUpdateSpinning}
              onFinish={() => setTargetId(null)}
            />
            <Button
              icon={<CloseOutlined />}
              type="link"
              onClick={() => setTargetId(null)}
            >
              取消
            </Button>
          </Spin>
        )}
      </>
    ),
    extra: (
      <Dropdown
        menu={{ items: getDropdownItems(comment.id) }}
        trigger={['click']}
        placement="bottomRight"
        disabled={(comment.user.id !== user.id)}
      >
        <Button
          style={{ float: 'right' }}
          icon={<EllipsisOutlined />}
          type="link"
        />
      </Dropdown>
    ),
    datetime: (
      <Tooltip title={datetime.format(comment.updated_at)}>
        <span style={{ fontSize: 1, color: 'LightGray' }}>{`${datetime.toNow(comment.updated_at)} ago`}</span>
      </Tooltip>
    ),
  });

  const items = comments.reduce((pre, comment) => [
    ...pre,
    generateItem(comment),
  ], [firstItem]);

  return (
    <List
      className="comment-list"
      footer={`${paginator.total} replies`}
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          actions={[item.extra]}
        >
          <div>
            {item.avatar}
            {item.datetime}
            <div style={{
              background: 'rgb(239, 242, 245)',
              borderRadius: '5px',
              padding: '5px',
              width: '50vh',
            }}
            >
              {item.author && (
                <div>
                  {item.author}
                  <br />
                </div>
              )}
              {item.content}
            </div>
          </div>
        </List.Item>
      )}
    />
  );
}
