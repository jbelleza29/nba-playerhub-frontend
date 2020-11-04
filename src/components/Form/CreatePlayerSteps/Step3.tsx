import React, { ReactElement, useEffect, useState } from 'react';
import { Typography, Select, Image, Skeleton, Form } from 'antd';
import axios from 'api/axiosConfig';

import './step3.scss';
import { FormInstance } from 'antd/lib/form';

interface Step3Props {
  form: FormInstance<any> | undefined;
}

export default function Step3({ form }: Step3Props): ReactElement {
  const { Title } = Typography;
  const { Option } = Select;
  const [teams, setTeams] = useState<Team[]>();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(form?.getFieldValue('team') || 'ATL');
  const nbaImgUrl = (abbrevation: string) => `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${abbrevation}.png`;

  useEffect(() => {
    axios.get('/teams')
      .then((res) => {
        setTeams(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const handleChange = (value: any) => {
    setSelected(value);
  }

  return (
    <div className='step-3-container'>
      <Title level={2}>Select your team</Title>
      <div className='team-select-container'>
        <Form.Item
          name='team'
          rules={[{ required: true, message: 'Team is required' }]}
          initialValue={selected}
        >
          <Select 
            placeholder='Select a team'
            className='team-select'
            loading={loading}
            onChange={handleChange}
          >
            {
              teams && teams.map((team) => 
                <Option 
                  key={team.abbreviation}
                  value={team.abbreviation}
                >
                  {team.name}
                </Option>)
            }
          </Select>
        </Form.Item>
        <div className='team-select-image'>
          {loading ? <Skeleton.Image /> :
            <Image
              width={200}
              src={nbaImgUrl(selected.toLowerCase())}
            />
          }
        </div>
      </div>
    </div>
  )
}
