import React, { ReactElement, SyntheticEvent } from 'react';
import { Table, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import Button, { ButtonProps } from 'components/Button/Button';

export interface TableAction extends Omit<ButtonProps, 'onClick'> {
  key: string;
  component: React.ReactNode;
  tooltip?: string;
  onClick: (e: SyntheticEvent, arg: any) => void;
}

interface TableProps {
  columns: ColumnsType;
  data: any[];
  actions?: TableAction[];
  loading: boolean;
  onChange?: (pagination: any, filters: any, sorter: any) => void;
  title?: () => string | React.ReactNode;
}

export default function CustomTable({ 
  columns, 
  data, 
  actions, 
  loading, 
  onChange, 
  title 
}: TableProps): ReactElement {

  const { Column } = Table;

  const getColumnsWithActions = (): ColumnsType => {
    let tempColumns = [...columns]; 

    const actionsColumn = {
      title: 'Actions',
      key: 'actions',
      dataIndex: '',
      render: (text: any, record: any) => {
        return(
          <Space size='middle'>
            {
              actions && actions.map((action: TableAction) => {
                console.log(action.danger);
                return (
                  <Tooltip title={action.tooltip} key={action.tooltip}>
                    <div>
                      <Button 
                        type={action.type}
                        shape={action.shape}
                        icon={action.icon}
                        onClick={(e) => action.onClick(e, record[action.key])}
                        danger={action.danger}
                      />
                    </div>
                  </Tooltip>
                );
              })
            }
          </Space>
        )
      }
    }

    tempColumns.push(actionsColumn);
    return tempColumns;
  }

  let allColumns = getColumnsWithActions();

  return (
    <div>
      <Table 
        dataSource={data}
        loading={loading}
        onChange={onChange}
        title={title}
      >
        {allColumns.map((column: any) => {
          return(
            <Column 
              title={column.title} 
              dataIndex={column.dataIndex} 
              key={column.key}
              render={column.render}
              sorter={column.sorter}
            />
          )
        })}
      </Table>
    </div>
  )
}
