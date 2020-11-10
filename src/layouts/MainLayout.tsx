import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { menuItems } from 'constants/layout';
import './main-layout.scss';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): ReactElement {
  const { Header, Content } = Layout;
  const history = useHistory();

  const onNavigateMenu = (...args: any): void => {
    if(args[0].key){
      history.push(args[0].key);
    }
  }
  const onNavigateHome = (): void => {
    history.push('/');
  }

  return (
    <Layout className='main-layout'>
      <Header>
        <div className='logo' onClick={onNavigateHome} role='img' aria-label='main logo' />
        <Menu theme='dark' mode='horizontal' onClick={onNavigateMenu}>
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
