import React, { ReactElement } from 'react'

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps): ReactElement {
  return (
    <div>
      {props.children}
    </div>
  )
}
