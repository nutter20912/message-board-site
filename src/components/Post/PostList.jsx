import {
  EllipsisOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, message, Modal } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useRef, useState } from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { Post } from '../../api';
import { useUserContext } from '../../UserContext';
import EditModal from './EditModal';
import TopCard from './TopCard';
import useVirtualList from '../useVirtualList';

/**
 * 卡片元件
 *
 * @returns {React.ReactElement}
 */
function ListItemCard({ item, setTargetId, setEditOpen, dispatch }) {
  const user = useUserContext();
  const navigate = useNavigate();

  const getHeaderDropdownItems = (postId) => [
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
            try {
              await Post.delete({ id: postId });
              dispatch({ type: 'delete', data: { id: postId } });
              message.info('刪除成功');
            } catch (error) {
              message.error(error.message);
            }
          },
        });
      },
    },
  ];

  const getTitle = ({ id: postId, user: { id: userId, name } }) => (
    <>
      <Avatar icon={<UserOutlined />} />
      <span style={{ marginLeft: '10px' }}>{name}</span>
      <Dropdown
        menu={{ items: getHeaderDropdownItems(postId) }}
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
    <Card
      style={{ margin: '10px' }}
      className="content-card"
      key={item.id}
      title={getTitle(item)}
      actions={[
        <MessageOutlined onClick={() => navigate(`/posts/${item.id}`)} />,
      ]}
    >
      <h3>{item.title}</h3>
      {item.content}
    </Card>
  );
}

/**
 * 貼文卡片列表元件
 *
 * @returns {React.ReactElement}
 */
export default function PostList() {
  const result = useAsyncValue();
  const listRef = useRef(null);

  const [editOpen, setEditOpen] = useState(false);
  const [targetId, setTargetId] = useState(false);

  const {
    state,
    dispatch,
    onScroll,
    containerHeight,
    itemHeight,
  } = useVirtualList(result, 0.38, Post.getIndex);

  const getListItem = (item, index) => (
    <>
      {index === 0 && <TopCard dispatch={dispatch} />}
      <ListItemCard
        item={item}
        setTargetId={setTargetId}
        setEditOpen={setEditOpen}
        dispatch={dispatch}
      />
    </>
  );

  return (
    <>
      <EditModal
        open={editOpen}
        setOpen={setEditOpen}
        targetId={targetId}
        dispatch={dispatch}
      />
      <VirtualList
        id="list"
        ref={listRef}
        data={state.renderData}
        height={containerHeight}
        itemHeight={itemHeight}
        itemKey="id"
        onScroll={onScroll}
        style={{ width: '50vw' }}
      >
        {(item, index) => getListItem(item, index)}
      </VirtualList>
    </>
  );
}
