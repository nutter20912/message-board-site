import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useNotification } from '../components';
import logo from '../images/logo.png';
import { pusher } from '../lib';
import { useAuthContext, useUserContext } from '../UserContext';

const { Content, Header, Sider } = Layout;

const TopHeader = styled(Header)`
  text-align: right;
  width: 100%;
  height: 70px;
  line-height: center;
  border-bottom: solid LightGray;
  padding: 0;
`;
const HeaderText = styled.span`
  margin-right: 10px;
`;
const MenuLogo = styled(Avatar)`
  src: ${(props) => props.src};
  height: 32px;
  margin: 16px;
`;
const LeftSider = styled(Sider)`
  border-right: 3px LightGray solid;
`;

/**
 * 基本佈局
 *
 * @returns {React.ReactElement}
 */
export default function BaseLayout({ menuComponents }) {
  const user = useUserContext();
  const { doLogout } = useAuthContext();
  const navigate = useNavigate();
  const notification = useNotification();

  const items = menuComponents?.map(({
    path, description, key, icon,
  }) => ({
    label: <Link to={path}>{description}</Link>,
    icon,
    key,
  }));

  const onLogout = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: '確定退出嗎?',
      onOk: () => doLogout(),
    });
  };

  const openNotification = (model) => {
    notification.info({
      message: 'Notification',
      description: `${model.user.name} 已評論 ${model.post.title}`,
      onClick: () => navigate(`/posts/${model.post.id}`),
    });
  };

  /** 使用者推播 */
  useEffect(() => {
    pusher().then((client) => {
      client.private(`users.${user?.id}`)
        .listen('.CommentCreated', ({ model }) => openNotification(model))
        .error((error) => message.error(error));
    });
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <LeftSider
        breakpoint="md"
      >
        <MenuLogo src={logo} size="large" />
        <Menu items={items} />
      </LeftSider>

      <Layout>

        <TopHeader>
          <HeaderText>{`welcome, ${user.name}`}</HeaderText>
          <Button
            icon={<LogoutOutlined />}
            type="link"
            size="large"
            onClick={onLogout}
          />
        </TopHeader>

        <Content>
          <Outlet />
        </Content>

      </Layout>

    </Layout>
  );
}
