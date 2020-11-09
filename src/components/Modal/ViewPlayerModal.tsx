import React, { ReactElement, useState, useEffect } from 'react';
import { Skeleton, Row, Col, Statistic, Typography } from 'antd';
import externalApi from 'api/externalAxios';

import Modal, { ModalProps } from './Modal';

interface ViewPlayerProps extends Omit<ModalProps, 'children' | 'onCancel'>  {
  onCancel: () => void;
  player: Player;
}

interface Stats {
  games_played: number;
  blk: number;
  ast: number;
  reb: number;
  pts: number;
}

export default function ViewPlayerModal({
  visible,
  onCancel,
  player
}: ViewPlayerProps): ReactElement {
  const { Title } = Typography;
  const [stats, setStats] = useState<Stats>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPlayer();
  }, [])
  const fetchPlayer = (): void => {
    setLoading(true);

    externalApi.get(`/players?search=${player.first_name} ${player.last_name}`)
      .then((res) => {
        fetchStats(res.data.data[0].id);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }
  
  const fetchStats = (id: number): void => {
    externalApi.get(`/season_averages?season=2017&player_ids[]=${id}`)
      .then((resp) => { 
        setStats(resp.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const onClose = (): void => {
    setStats({
      pts: 0,
      blk: 0,
      games_played: 0,
      reb: 0,
      ast: 0
    });
    onCancel();
  }

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <div>
        <Title level={2}>Player Information</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Name" value={`${player.first_name} ${player.last_name}`} />
          </Col>
          <Col span={12}>
            <Statistic title="Position" value={player.position} precision={2} />
          </Col>
          <Col span={12}>
            <Statistic title="Team" value={player.team.full_name} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            {loading ? <Skeleton active paragraph={{rows: 1}} /> :
              <Statistic title="Games Played" value={stats?.games_played} />
            }
          </Col>
          <Col span={12}>
            {loading ? <Skeleton active paragraph={{rows: 1}} /> :
              <Statistic title="Points Per Game" value={stats?.pts} precision={2} />
            }
          </Col>
          <Col span={12}>
            {loading ? <Skeleton active paragraph={{rows: 1}} /> :
              <Statistic title="Assist" value={stats?.ast} />
            }
          </Col>
          <Col span={12}>
            {loading ? <Skeleton active paragraph={{rows: 1}} /> :
              <Statistic title="Rebounds" value={stats?.reb} />
            }
          </Col>
        </Row>
      </div>
    </Modal>
  )
}
