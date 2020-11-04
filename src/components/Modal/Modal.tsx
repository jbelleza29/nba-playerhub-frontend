import React, { ReactElement } from 'react';
import Modal from 'antd/lib/modal/Modal';

export interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  title?: string;
  cancelText?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  confirmLoading?: boolean;
  footer?: React.ReactNode;
  destroyOnClose?: boolean;
}

export default function ModalBase({ 
  visible, 
  children,
  onCancel,
  onOk,
  title,
  cancelText,
  okText,
  confirmLoading,
  footer,
  destroyOnClose
}: ModalProps): ReactElement {
  return (
    <Modal 
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      cancelText={cancelText}
      okText={okText}
      confirmLoading={confirmLoading}
      footer={footer}
      destroyOnClose={destroyOnClose}
    >
      {children}
    </Modal>
  )
}
