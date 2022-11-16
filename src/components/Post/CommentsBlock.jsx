import {
  CloseOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Comment, Dropdown, List, message, Modal, Spin, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useAsyncValue, useParams } from 'react-router-dom';
import * as api from '../../api';
import { datetime, storage } from '../../lib';
import CommentInput from './CommentInput';

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

  const items = comments.reduce((pre, comment) => [
    ...pre,
    {
      author: comment.user.name,
      avatar: <Avatar>{comment.user.name[0].toUpperCase()}</Avatar>,
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
              />
            </Spin>
          )}
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
        </>
      ),
      datetime: (
        <Tooltip title={datetime.format(comment.updated_at)}>
          <span>{`${datetime.toNow(comment.updated_at)} ago`}</span>
        </Tooltip>
      ),
    },
  ], [{
    avatar: <Avatar icon={<UserOutlined />} />,
    content: (
      <Spin spinning={storeSpinning} wrapperClassName="comment-input-spin">
        <CommentInput
          targetId={postId}
          setComments={setComments}
          action="store"
          setSpinning={setStoreSpinning}
        />
      </Spin>
    ),
  }]);

  return (
    <List
      className="comment-list"
      footer={`${paginator.total} replies`}
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item?.datetime}
          />
        </li>
      )}
    />
  );
}
