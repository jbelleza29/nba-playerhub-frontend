import React, { ReactElement } from 'react';
import { Layout, Menu } from 'antd';

import { menuItems } from 'constants/layout';
import './main-layout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): ReactElement {
  const { Header, Content } = Layout;
  return (
    <Layout className='main-layout'>
      <Header>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal'>
          {menuItems.map((item) => <Menu.Item key={item.key}>{item.label}</Menu.Item>)}
        </Menu>
      </Header>
      <Layout>
        <Content className='content'>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
