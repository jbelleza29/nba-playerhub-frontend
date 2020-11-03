import React, { ReactElement } from 'react';
import { FormProps } from 'antd/lib/form';
import { Form, Input, InputNumber } from 'antd';
import FormItems from 'components/Form/FormItems';

export interface FormBaseProps extends Omit<FormProps, 'onChange'> {
  children?: React.ReactNode;
  formItems?: any[];
  onChange?: (e: any) => void;
}

export default function FormBase({
  children,
  formItems,
  layout,
  className,
  initialValues,
  onChange,
  form
}: FormBaseProps): ReactElement {
  return (
    <Form 
      layout={layout} 
      className={className}
      fields={formItems}
      initialValues={initialValues}
      form={form}
    >
      {children  ? children : <FormItems formItems={formItems} onChange={onChange} />}
    </Form>
  )
}
