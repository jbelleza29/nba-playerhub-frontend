import React, { ReactElement } from 'react';
import { Form, Radio, Typography } from 'antd';

import './step2.scss';

export default function Step2(): ReactElement {
  const { Title } = Typography;

  return (
    <div className='step-2-container'>
      <Title level={2}>Select your position</Title>
      <Form.Item
        name='position'
        rules={[{ required: true, message: 'Position is required' }]}
      >
        <Radio.Group className='radio-group'>
          <Radio.Button value="G" className='radio-group-item guard'>
            <span className='radio-text'>Guard</span>
          </Radio.Button>
          <Radio.Button value="F" className='radio-group-item forward'>
            <span className='radio-text'>Forward</span>
          </Radio.Button>
          <Radio.Button value="C" className='radio-group-item center'>
            <span className='radio-text'>Center</span>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
