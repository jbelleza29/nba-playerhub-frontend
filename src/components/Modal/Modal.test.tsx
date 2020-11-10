import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act,  } from 'react-dom/test-utils';

import Modal from './Modal';


test('show modal with content', () => {
  const onCancel = jest.fn();
  const onOk = jest.fn();
  const props = {
    visible: true,
    onCancel: onCancel,
    onOk: onOk
  };

  const { getByText, getByLabelText, getByRole } = render(
    <Modal {...props}>
      <span>Test Modal</span>
    </Modal>
  );

  expect(getByText(/Test Modal/i)).toBeInTheDocument();
  const exitButton = getByLabelText('close');
  const okButton = getByRole('button', { name: /Ok/i });
  const cancelButton = getByRole('button', { name: /Cancel/i });

  act(() => {
    fireEvent.click(exitButton);
    fireEvent.click(okButton);
    fireEvent.click(cancelButton);
  })
  
  expect(onCancel).toHaveBeenCalledTimes(2);
  expect(onOk).toHaveBeenCalledTimes(1);
  
});

