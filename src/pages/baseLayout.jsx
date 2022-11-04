import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Layout, Menu, Modal,
} from 'antd';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { storage } from '../service';

const {
  Content, Header, Sider,
} = Layout;

const HeaderStyle = styled(Header)`
  text-align: right;
  border-bottom: 1px solid #1da57a;
  height: 50px;
  line-height: 50px;
  padding: 0;
  background: #fff;
`;
const HeaderText = styled.span`
  margin-right: 10px;
`;
const MenuLogo = styled(Avatar)`
  src: ${(props) => props.src};
  height: 32px;
  margin: 16px;
`;

/**
 * 基本佈局
 *
 * @returns {React.ReactElement}
 */
export default function BaseLayout({ menuComponents }) {
  const navigate = useNavigate();

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
      onOk() {
        storage.reset('user');
        navigate('/login');
      },
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <MenuLogo src={logo} size="large" />
        <Menu items={items} theme="dark" mode="inline" />
      </Sider>

      <Layout>

        <HeaderStyle>
          <HeaderText>welcome</HeaderText>
          <Button
            icon={<LogoutOutlined />}
            type="link"
            size="large"
            onClick={onLogout}
          />
        </HeaderStyle>

        <Content>
          <Outlet />
        </Content>

      </Layout>

    </Layout>
  );
}
