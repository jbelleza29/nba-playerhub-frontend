import React, { ReactElement, SyntheticEvent, useEffect, useState, useCallback } from 'react';
import { DeleteOutlined, EyeFilled, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';

import MainLayout from 'layouts/MainLayout';
import axios from 'api/axiosConfig';
import Button from 'components/Button/Button';
import Table, { TableAction } from 'components/Table/Table';
import CreateModal from 'components/Modal/CreatePlayerModal';
import ViewPlayerModal from 'components/Modal/ViewPlayerModal';
import { playersColumn } from 'constants/players';

import './players-list.scss';

export default function PlayersList(): ReactElement {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState<any>();
  const [modal, setModal] = useState('');
  const [loading, setLoading] = useState(true);
  const { confirm } = Modal;
  
  useEffect(() => {
    setLoading(true);
    axios.get('/players')
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const formatToFormData = (player: Player | undefined): Object | undefined => {
    if(player)
      return {
        ...player,
        team: player.team.abbreviation
      }
  }

  const showEdit = useCallback((e: SyntheticEvent, key: any): void => {
    const player = players.find((x) => x.id === key);
    setSelected(formatToFormData(player));
    setModal('edit');
  }, [players])

  const showCreate = (): void => {
    setModal('create');
  }

  const closeModal = (): void => {
    setSelected({});
    setModal('');
  }

  const viewPlayer = useCallback((e: SyntheticEvent, key: any): void => {
    // Show view player modal
    const player = players.find((x) => x.id === key);
    setSelected(player);
    setModal('view');
  }, [players])

  const handleTableChange = (pagination: any, filters: any, sorter: any): void => {
    console.log(pagination, filters, sorter);
  }

  const showDelete = (e: SyntheticEvent, key: any): void => {
    confirm({
      title: 'Delete Player',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to delete this player?',
      okType: 'danger',
      okText: 'Yes',
      onOk() { return onDelete(key); } ,
      onCancel() {},
    });
  }

  const onDelete = (key: number): Promise<void> => {
    return axios.get(`/players/${key}`)
      .then(() => {
        message.success('Player deleted!');
        let tempPlayers = [...players];
        setPlayers(tempPlayers.filter((x) => x.id !== key));
      })
      .catch(() => {
        message.error('Failed to delete player');
      })
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
      tooltip: 'Edit',
      component: 'button',
      type: 'default',
      shape: 'circle',
      icon: <EditOutlined />,
      onClick: showEdit
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
      {
        modal === 'create' || modal === 'edit' ?
        <CreateModal 
          visible={modal === 'create' || modal === 'edit'}
          onCancel={closeModal}
          onOk={closeModal} 
          initialValue={selected}
          type={modal}
        /> : null
      }
      {modal === 'view' ?
      <ViewPlayerModal 
        visible={modal === 'view'}
        onCancel={closeModal}
        onOk={closeModal}
        player={selected}
      /> : null }
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
