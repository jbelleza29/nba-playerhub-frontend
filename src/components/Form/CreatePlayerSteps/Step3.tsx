import React, { ReactElement } from 'react';
import { Typography } from 'antd';

export default function Step3(): ReactElement {
  const { Title } = Typography;

  return (
    <div>
      <Title level={2}>Select your position</Title>
      Step 3
    </div>
  )
}
