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

  const getExtra = (comment) => (
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
  );

  return (
    <List
      className="comment-list"
      header={[
        <div key="replies">{`${paginator.total} replies`}</div>,
        <Tooltip key="0" title="Enter 送出">
          <CommentAvatar gap="10" icon={<UserOutlined />} />
          <Spin spinning={storeSpinning} wrapperClassName="comment-input-spin">
            <CommentInput
              targetId={postId}
              setComments={setComments}
              action="store"
              setSpinning={setStoreSpinning}
            />
          </Spin>
        </Tooltip>,
      ]}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item) => (
        <List.Item actions={[getExtra(item)]}>
          <div>
            <CommentAvatar>{item.user.name[0].toUpperCase()}</CommentAvatar>
            <Tooltip title={datetime.format(item.updated_at)}>
              <span style={{ fontSize: 1, color: 'LightGray' }}>
                {`${datetime.toNow(item.updated_at)} ago`}
              </span>
            </Tooltip>

            <div
              style={{
                background: 'rgb(239, 242, 245)',
                borderRadius: '5px',
                padding: '5px',
                width: '50vh',
              }}
            >
              <div>
                <b>{item.user.name}</b>
                <br />
              </div>

              {targetId !== item.id && item.content}
              {targetId === item.id && (
                <Spin spinning={updateSpinning} wrapperClassName="comment-input-spin">
                  <CommentInput
                    targetId={targetId}
                    value={item.content}
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
            </div>
          </div>
        </List.Item>
      )}
    />
  );
}
