import React, { ReactElement, SyntheticEvent, useEffect, useState, useCallback } from 'react';
import { DeleteOutlined, EyeFilled, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, message, Input } from 'antd';

import MainLayout from 'layouts/MainLayout';
import axios from 'api/axiosConfig';
import Button from 'components/Button/Button';
import Table, { TableAction } from 'components/Table/Table';
import CreateModal from 'components/Modal/CreatePlayerModal';
import ViewPlayerModal from 'components/Modal/ViewPlayerModal';
import { playersColumn } from 'constants/players';
import { convertToQuery } from 'utils/queryBuilder';

import './players-list.scss';

export default function PlayersList(): ReactElement {

  const { Search } = Input;
  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState<any>();
  const [modal, setModal] = useState('');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    column: 'last_name',
    order: 'ascend',
    filter: ''
  });
  const { confirm } = Modal;
  
  useEffect(() => {
    setLoading(true);
    const url = convertToQuery('/players', queryParams);
    axios.get(url)
      .then((res) => {
        setTotal(res.data.total);
        setPlayers(res.data.players);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [queryParams])

  const formatToFormData = (player: Player | undefined): Object | undefined => {
    if(player)
      return {
        ...player,
        team: player.team.abbreviation
      }
  }

  const showEdit = useCallback((e: SyntheticEvent, key: any): void => {
    const player = players.find((x) => x.player_id === key);
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
    const player = players.find((x) => x.player_id === key);
    setSelected(player);
    setModal('view');
  }, [players])

  const handleTableChange = (pagination: any, filters: any, sorter: any): void => {
    setQueryParams({
      ...queryParams,
      page: pagination.current,
      limit: pagination.pageSize,
      column: sorter.columnKey,
      order: sorter.order
    })
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
    return axios.delete(`/players/${key}`)
      .then(() => {
        message.success('Player deleted!');
        let tempPlayers = [...players];
        setPlayers(tempPlayers.filter((x) => x.player_id !== key));
      })
      .catch(() => {
        message.error('Failed to delete player');
      })
  }

  const onSearch = (value: any) => {
    setQueryParams({
      ...queryParams,
      filter: value
    });
  }

  const actions: TableAction[] = [
    {
      key: 'player_id',
      tooltip: 'View',
      component: 'button',
      type: 'ghost', 
      shape: 'circle',
      icon: <EyeFilled />,
      onClick: viewPlayer
    },
    {
      key: 'player_id',
      tooltip: 'Edit',
      component: 'button',
      type: 'default',
      shape: 'circle',
      icon: <EditOutlined />,
      onClick: showEdit
    },
    {
      key: 'player_id',
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
        <div>
        
        </div>
        <div className='players-list-table'>
          <div className='table-search'>
            <Search 
              placeholder='Search for players/team'
              onSearch={onSearch}
              enterButton
              loading={loading}
            />
          </div>
          <Table 
            columns={playersColumn}
            data={players}
            actions={actions}
            loading={loading}
            onChange={handleTableChange}
            pagination={{ total: total }}
          />
        </div>
      </div>
    </MainLayout>
  )
}
