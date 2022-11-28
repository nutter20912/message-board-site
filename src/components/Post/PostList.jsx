import {
  EllipsisOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, message, Modal } from 'antd';
import List from 'rc-virtual-list';
import React, { forwardRef, useEffect, useReducer, useRef, useState } from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { Post } from '../../api';
import { storage } from '../../lib';
import EditModal from './EditModal';
import TopCard from './TopCard';

const ForwardTopCard = forwardRef((...args) => TopCard(...args));

/**
 * 虛擬列表分頁器
 * @param {state.postSet} postSet id 收集器
 * @param {state.renderData} renderData 渲染資料
 * @param {action.type} type 動作類型
 * @param {action.data} data 資料
 * @returns
 */
function reducer(state, { type, data }) {
  const { currentPage, renderData, postSet } = state;

  switch (type) {
    case 'next': {
      return {
        ...state,
        currentPage: currentPage + 1,
      };
    }
    case 'add': {
      renderData.unshift(renderData.shift(), data);

      return {
        ...state,
        postSet: postSet.add(data.id),
      };
    }
    case 'load': {
      const appendData = data.filter(
        (item) => !postSet.has(item.id),
      );

      appendData.forEach((item) => postSet.add(item.id));

      return {
        ...state,
        renderData: renderData.concat(appendData),
      };
    }
    default: {
      throw new Error();
    }
  }
}

/**
 * 貼文卡片列表元件
 *
 * @returns {React.ReactElement}
 */
export default function PostList() {
  const user = storage.get('user');
  const { data, paginator } = useAsyncValue();
  const navigate = useNavigate();
  const listRef = useRef(null);

  const [editOpen, setEditOpen] = useState(false);
  const [targetId, setTargetId] = useState(false);

  const [{ renderData, currentPage }, dispatch] = useReducer(reducer, {
    renderData: [
      { id: 0 }, // TopCard Component
      ...data,
    ],
    postSet: new Set(data.map((post) => post.id)),
    currentPage: paginator.current_page,
  });

  const containerHeight = 600;
  const itemHeight = 200;

  const onScroll = (e) => {
    if (currentPage === paginator.last_page) {
      return;
    }

    if (containerHeight === (e.currentTarget.scrollHeight - e.currentTarget.scrollTop)) {
      dispatch({ type: 'next' });
    }
  };

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

  /** 載入分頁資料 */
  useEffect(() => {
    if (currentPage !== 1) {
      Post.getIndex({ page: currentPage })
        .then((res) => dispatch({ type: 'load', data: res.data }));
    }
  }, [currentPage]);

  return (
    <>
      <EditModal
        open={editOpen}
        setOpen={setEditOpen}
        targetId={targetId}
      />

      <List
        id="list"
        ref={listRef}
        data={renderData}
        height={containerHeight}
        itemHeight={itemHeight}
        itemKey="id"
        onScroll={onScroll}
        style={{ width: '50vw' }}
      >
        {
          (post) => ((post.id === 0)
            ? <ForwardTopCard dispatch={dispatch} />
            : (
              <Card
                style={{ margin: '10px' }}
                className="content-card"
                key={post.id}
                title={getCardTitle(post)}
                actions={[
                  <MessageOutlined onClick={() => navigate(`/posts/${post.id}`)} />,
                ]}
              >
                <p>{post.id}</p>
                <h3>{post.title}</h3>
                {post.content}
              </Card>
            ))
        }

      </List>
    </>
  );
}
