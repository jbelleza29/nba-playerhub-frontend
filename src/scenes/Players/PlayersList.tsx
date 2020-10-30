import React, { ReactElement, useEffect, useState } from 'react';

import MainLayout from 'layouts/MainLayout';
import axios from 'api/axiosConfig';

export default function PlayersList(): ReactElement {
  const [players, setPlayers] = useState<any>([]);

  useEffect(() => {
    axios.get('/players')
      .then((res) => {
        setPlayers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })

    // 
  }, [])

  return (
    <MainLayout>
      <div>
        {players.map((player: any, index: number) => 
          <span>{`${player.first_name} ${player.last_name}`}</span>
        )}
      </div>
    </MainLayout>
  )
}
