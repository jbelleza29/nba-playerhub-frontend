import React, { ReactElement, useState } from 'react';
import { Space, Steps, Form } from 'antd';

import Modal, { ModalProps } from './Modal';
import Button from 'components/Button/Button';
import CreatePlayerForm from 'components/Form/CreatePlayerForm';

interface CreatePlayerProps extends Omit<ModalProps, 'children'> {
}

export default function CreatePlayerModal({ visible, onCancel, onOk }: CreatePlayerProps): ReactElement {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const { Step } = Steps;
  const steps = [
    {
      title: 'Player'
    },
    {
      title: 'Position'
    },
    {
      title: 'Team'
    },
  ];

  const onNext = (): void => {
    form.validateFields()
      .then((values) => {
        console.log(values);
        setCurrent(current + 1);
      })
      .catch((err) => {
      })
  }

  const onPrevious = (): void => {
    if(current !== 0){
      setCurrent(current - 1);
      return;
    }
  }
 
  return (
    <Modal 
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Space> 
          <Button 
            text={current === 0 ? 'Cancel' : 'Previous' }
            type='ghost'
            onClick={current === 0 ? onCancel : onPrevious}
          /> 
          <Button text={current >= steps.length - 1 ? 'Submit' : 'Next' } type='primary' onClick={onNext} />
        </Space>
      ]}
    >
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <CreatePlayerForm currentStep={current} form={form} />
    </Modal>
  )
}
