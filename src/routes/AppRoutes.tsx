import React, { ReactElement, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom'

const LandingPage = lazy(async () =>
  import('scenes/LandingPage/LandingPage'),
);
const PlayersList = lazy(async () =>
  import('scenes/Players/PlayersList'),
);

export default function AppRoutes(): ReactElement {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/players' exact component={PlayersList} />
      </Switch>
    </Suspense>
  )
}