import { AlertOutlined } from '@ant-design/icons';
import { Avatar, List, Modal, Spin, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useRef, useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { Notification } from '../../api';
import useVirtualList from '../useVirtualList';

/**
 * 通知項目元件
 *
 * @returns {List.Item}
 */
const NotificationItem = styled(List.Item)`
&:hover {
  cursor: pointer;
  background: LightGray;
  filter: brightness(110%);
}
`;

/**
 * 可通知物件內容
 *
 * @param {state.targetId} targetId 物件編號
 *
 * @returns
 */
function Content({ targetId }) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  useEffect(() => {
    Notification.show({ id: targetId })
      .then(({ result: { notifiable } }) => {
        setItem(notifiable);
        setLoading(false);
      })
      .catch((e) => message.error(e.message));
  }, []);

  return (
    <Spin spinning={loading}>
      {!loading && (
        <>
          <p>{`IP位置: ${item.ip}`}</p>
          <p>{`使用者裝置: ${item.user_agent}`}</p>
          <p>{`登入時間: ${item.request_time}`}</p>
        </>
      )}
    </Spin>
  );
}

/**
 * 通知列表元件
 *
 * @returns {React.ReactElement}
 */
export default function NotificationList() {
  const result = useAsyncValue();
  const listRef = useRef(null);
  const {
    state,
    onScroll,
    containerHeight,
    itemHeight,
  } = useVirtualList(result, 0.15, Notification.getIndex);

  const onClick = (targetId) => {
    Modal.info({
      title: '新登入警示',
      content: <Content targetId={targetId} />,
    });
  };

  return (
    <List
      size="large"
      style={{
        width: '50vw',
        background: 'white',
      }}
    >
      <VirtualList
        id="list"
        ref={listRef}
        data={state.renderData}
        height={containerHeight}
        itemHeight={itemHeight}
        itemKey="id"
        onScroll={onScroll}
      >
        {
          (item) => (
            <NotificationItem
              onClick={() => onClick(item.id)}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<AlertOutlined />} />}
                title={<div>{item.created_at}</div>}
                description={<div>{item.content}</div>}
              />
            </NotificationItem>
          )
        }
      </VirtualList>
    </List>
  );
}
