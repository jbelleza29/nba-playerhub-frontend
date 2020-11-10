import React, { ReactElement, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageLoader from 'components/Loader/PageLoader';

const LandingPage = lazy(async () =>
  import('scenes/LandingPage/LandingPage'),
);
const PlayersList = lazy(async () =>
  import('scenes/Players/PlayersList'),
);

export default function AppRoutes(): ReactElement {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/players' exact component={PlayersList} />
      </Switch>
    </Suspense>
  )
}