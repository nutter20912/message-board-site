import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

/**
 * 基本佈局
 *
 * @returns {React.ReactElement}
 */
export default function BaseLayout({ menuComponents }) {
  const {
    Content, Footer, Header, Sider,
  } = Layout;

  const items = menuComponents?.map(({
    path, description, key, icon,
  }) => ({
    label: <Link to={path}>{description}</Link>,
    icon,
    key,
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>header</Header>
      <Layout>

        <Sider>
          <Menu items={items} theme="dark" />
        </Sider>

        <Content>
          <Outlet />
        </Content>

      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©
      </Footer>
    </Layout>
  );
}
