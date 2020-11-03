import React, { ReactElement } from 'react';
import { Form, Input, InputNumber } from 'antd';

interface FormItemsProps {
  formItems?: any[];
  onChange?: (e: any) => void;
}

export default function FormItems({
  formItems,
  onChange
}: FormItemsProps): ReactElement {
  return (
    <div>
      {formItems && formItems.map((formItem) => {
        return(
          <Form.Item 
            key={formItem.label}
            label={formItem.label}
            name={formItem.name}
            rules={formItem.rules}
          >
            {formItem.type === 'number' ? 
            <InputNumber
              min={formItem.min} 
              max={formItem.max}
              step={formItem.step}
            /> :
            <Input  />
            }
          </Form.Item>
        )
      })}
    </div>
  )
}
