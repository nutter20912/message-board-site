import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Modal } from 'antd';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { storage } from '../lib';

const { Content, Header, Sider } = Layout;

const TopHeader = styled(Header)`
  z-index: 2;
  position: sticky;
  top: 0;
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
  z-index: 10;
  position: sticky;
  bottom: 0;
  overflow: auto;
  left: 0;
  border-right: 3px LightGray solid;
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

      <LeftSider
        breakpoint="md"
      >
        <MenuLogo src={logo} size="large" />
        <Menu items={items} />
      </LeftSider>

      <Layout>

        <TopHeader>
          <HeaderText>{`welcome, ${storage.get('user')?.name}`}</HeaderText>
          <Button
            icon={<LogoutOutlined />}
            type="link"
            size="large"
            onClick={onLogout}
          />
        </TopHeader>

        <Content style={{ width: '60%' }}>
          <Outlet />
        </Content>

      </Layout>

    </Layout>
  );
}
