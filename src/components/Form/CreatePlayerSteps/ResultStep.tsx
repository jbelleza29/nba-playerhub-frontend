import React, { ReactElement } from 'react';
import { Result } from 'antd';

export default function ResultStep(): ReactElement {
  return (
    <Result 
      status="success"
      title="You have created a NBA Player"
      subTitle="This player could be the next GOAT!"
    />
  )
}
