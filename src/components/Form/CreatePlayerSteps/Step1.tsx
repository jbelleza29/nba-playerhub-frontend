import React, { ReactElement } from 'react';
import { Typography } from 'antd';

import FormItems from 'components/Form/FormItems';

export default function Step1(): ReactElement {
  const { Title } = Typography;
  const formItems = [
    {
      label: 'First name',
      name: 'first_name',
      rules: [{ required: true, message: 'First name is required' }],
    },
    {
      label: 'Last name',
      name: 'last_name',
      rules: [{ required: true, message: 'Last name is required' }],
    },
    {
      label: 'Height (ft)',
      name: 'height_feet',
      type: 'number',
      min: 5,
      max: 8,
      step: 0.1,
    },
    {
      label: 'Weight (lbs)',
      name: 'weight_pounds',
      type: 'number',
      min: 90,
      max: 300,
      step: 1
    },
  ];

  return (
    <div>
      <Title level={2}>Player Information</Title>
      <FormItems 
        formItems={formItems}
      />
    </div>
  )
}
