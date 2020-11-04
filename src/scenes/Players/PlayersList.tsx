import React, { ReactElement, SyntheticEvent, useEffect, useState, useCallback } from 'react';
import { DeleteOutlined, EyeFilled } from '@ant-design/icons';

import MainLayout from 'layouts/MainLayout';
import axios from 'api/axiosConfig';
import Button from 'components/Button/Button';
import Table, { TableAction } from 'components/Table/Table';
import CreateModal from 'components/Modal/CreatePlayerModal';
import { playersColumn } from 'constants/players';

import './players-list.scss';

export default function PlayersList(): ReactElement {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState<any>();
  const [modal, setModal] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    axios.get('/players')
      .then((res) => {
        setPlayers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const showEdit = (e: any): void => {
    console.log(e);
    console.log('edit');
  }

  const showDelete = (e: SyntheticEvent): void => {
    console.log(e.target, 'delete');
  }

  const showCreate = (): void => {
    setModal('create');
  }

  const closeModal = (): void => {
    setModal('');
  }

  const viewPlayer = useCallback((e: SyntheticEvent, key: any): void => {
    // Show view player modal
  }, [])

  const handleTableChange = (pagination: any, filters: any, sorter: any): void => {
    console.log(pagination, filters, sorter);
  }

  const actions: TableAction[] = [
    {
      key: 'id',
      tooltip: 'View',
      component: 'button',
      type: 'ghost', 
      shape: 'circle',
      icon: <EyeFilled />,
      onClick: viewPlayer
    },
    {
      key: 'id',
      tooltip: 'Delete',
      component: 'button',
      type: 'ghost', 
      danger: true,
      shape: 'circle',
      icon: <DeleteOutlined />,
      onClick: showDelete
    }
  ];

  return (
    <MainLayout>
      <CreateModal 
        visible={modal === 'create'}
        onCancel={closeModal}
        onOk={closeModal} 
      />
      <div className='players-list-container'>
        <div className='players-list-header'>
          <h2>Players</h2>
          <Button type='primary' text='Create Player' shape='round' onClick={showCreate} />
        </div>
        <div className='players-list-table'>
          <Table 
            columns={playersColumn}
            data={players}
            actions={actions}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </MainLayout>
  )
}
