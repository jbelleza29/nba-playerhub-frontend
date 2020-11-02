import React, { ReactElement, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

export interface ButtonProps {
  type?: 'primary' | 'text' | 'link' | 'ghost' | 'default' | 'dashed';
  shape?: 'circle' | 'round';
  text?: string;
  onClick?: (e: SyntheticEvent) => void;
  link?: Boolean;
  linkPath?: any;
  value?: any;
  icon?: React.ReactNode;
  danger?: boolean;
}

export default function CustomButton({ 
  text, 
  onClick, 
  link, 
  linkPath, 
  value, 
  type, 
  shape,
  icon,
  danger
 }: ButtonProps): ReactElement {

  return (
    <div>
      { link ? 
        <Link to={linkPath}>{text}</Link> : 
        <Button 
          type={type}
          onClick={onClick}
          shape={shape}
          value={value}
          icon={icon}
          danger={danger}
        >
          {text}
        </Button> 
      }
    </div>
  )
}
