import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

interface ButtonProps {
  text: string;
  onClick?: (e: any) => void;
  link?: Boolean;
  linkPath?: any;
  value?: any;
}

export default function CustomButton({ text, onClick, link, linkPath, value }: ButtonProps): ReactElement {
  console.log(linkPath, link)
  return (
    <div>
      { link ? 
        <Link to={linkPath}>{text}</Link> : 
        <Button type='primary' onClick={onClick} value={value}>{text}</Button> 
      }
    </div>
  )
}
