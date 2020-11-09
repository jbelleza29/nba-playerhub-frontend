import React, { ReactElement } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './page-loader.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


export default function PageLoader(): ReactElement {
  return (
    <div className='page-loader'>
      <Spin indicator={antIcon} size='large' />
    </div>
  )
}
