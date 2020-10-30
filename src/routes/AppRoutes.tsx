import React, { ReactElement, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom'

const LandingPage = lazy(async () =>
  import('scenes/LandingPage/LandingPage'),
);

export default function AppRoutes(): ReactElement {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Switch>
        <Route path='/' exact component={LandingPage} />
      </Switch>
    </Suspense>
  )
}