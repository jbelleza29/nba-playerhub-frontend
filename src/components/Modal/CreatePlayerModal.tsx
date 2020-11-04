import React, { ReactElement, useState } from 'react';
import { Space, Steps, Form } from 'antd';

import Modal, { ModalProps } from './Modal';
import Button from 'components/Button/Button';
import CreatePlayerForm from 'components/Form/CreatePlayerForm';
import axios from 'api/axiosConfig';

interface CreatePlayerProps extends Omit<ModalProps, 'children' | 'onCancel'> {
  onCancel: () => void;
}

export default function CreatePlayerModal({ visible, onCancel, onOk }: CreatePlayerProps): ReactElement {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
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
    }
  ];

  const onSubmit = async (values: any): Promise<void> => {
    // axios.post('/players', values)
    const delay = async (data: any, timeout: number): Promise<void> => 
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
      }, timeout);
    });

    setLoading(true);
    await delay(values, 2000);
    setLoading(false);
    setCurrent(current + 1);
  }

  const validate = (): void => {
    form.validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch((err) => {
        // Allow to navigate back to position selection if it is not given
        if(err.errorFields[0].name[0] === 'position' && current === 0){
          setCurrent(current + 1);
        }
        if(err.errorFields[0].name[0] === 'team' && current === 1){
          setCurrent(current + 1);
        }
        console.log(err, 'error');
      })
  }

  const onNext = (): void => {
    if(current === steps.length - 1){
      form.submit();
    } else {
      validate();
    } 
  }

  const onClose = (): void => {
    onCancel();
    setCurrent(0);
    form.resetFields();
  }

  const onPrevious = (): void => {
    setCurrent(current - 1);
  }

  return (
    <Modal 
      visible={visible}
      onCancel={onClose}
      footer={[
        <Space> 
          <Button 
            text={current === 0 || current === steps.length ? 'Close' : 'Previous' }
            type='ghost'
            onClick={current === 0 || current === steps.length ? onClose : onPrevious}
            disabled={loading}
          /> 
          {
            current === steps.length ? null :
            <Button
              text={current >= steps.length - 1 ? 'Submit' : 'Next' }
              type='primary' 
              onClick={onNext}
              loading={loading}
            />
          }
        </Space>
      ]}
    >
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <CreatePlayerForm currentStep={current} form={form} onFinish={onSubmit} />
    </Modal>
  )
}
