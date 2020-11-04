import React, { ReactElement } from 'react';
import { Result } from 'antd';

import Button from 'components/Button/Button';

export default function ResultStep(): ReactElement {
  return (
    <Result 
      status="success"
      title="You have created an NBA Player"
      subTitle="Goodluck on your path to becoming the Greatest of All Time"
    />
  )
}
