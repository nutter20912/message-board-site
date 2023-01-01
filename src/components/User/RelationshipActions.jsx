import { Button, Dropdown, Space, message } from 'antd';
import React, { useState } from 'react';
import { useUserContext } from '../../UserContext';
import { UserRelationship } from '../../api';

/**
 * 使用者關係按鈕
 *
 * @returns {React.ReactElement}
 */
export default function RelationshipActions({ user, setUsers }) {
  const authUser = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    setLoading(true);

    UserRelationship.stroe({ id: user.id })
      .then(() => {
        setLoading(false);
        setUsers((pre) => ({
          ...pre,
          [user.id]: {
            ...pre[user.id],
            relationship: { type: 0 },
          },
        }));
      })
      .catch((e) => message.error(e.message));
  };

  const handleDelete = () => {
    setLoading(true);

    UserRelationship.delete({ id: user.id })
      .then(() => {
        setLoading(false);
        setUsers((pre) => ({
          ...pre,
          [user.id]: {
            ...pre[user.id],
            relationship: undefined,
          },
        }));
      })
      .catch((e) => message.error(e.message));
  };

  const applyingItems = [
    { key: '1', label: (<Button key="cancel" onClick={handleDelete}>取消</Button>) },
  ];

  const friendItems = [
    { key: '1', label: (<Button key="delete" onClick={handleDelete}>解除關係</Button>) },
  ];

  const getComponents = (relationshipType) => {
    if (relationshipType === 0) {
      return [
        (
          <Dropdown key="applying" menu={{ items: applyingItems }} trigger={['click']}>
            <Button type="dashed" loading={loading}>申請中</Button>
          </Dropdown>
        ),
        <Button key="message">發送訊息</Button>,
      ];
    }

    return [
      (
        <Dropdown menu={{ items: friendItems }}>
          <Button key="friend">朋友</Button>
        </Dropdown>
      ),
      <Button type="primary" key="message">發送訊息</Button>,
    ];
  };

  return (
    <Space>
      {user.relationship?.type === undefined
        && authUser.id !== user.id
        && ([
          <Button type="primary" key="apply" loading={loading} onClick={handleApply}>申請</Button>,
          <Button key="message">發送訊息</Button>,
        ])}

      {user.relationship?.type !== undefined && getComponents(user.relationship?.type)}
    </Space>
  );
}
