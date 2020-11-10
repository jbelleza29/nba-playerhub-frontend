import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import LandingPage from './LandingPage';
import PlayersList from 'scenes/Players/PlayersList';

test('initial render', async () => {
  const { getByText } = render(<LandingPage />);
  const defaultText = getByText(/See Player's Stats/i);

  expect(getByText(/View Players/i, { selector: 'span' })).toBeInTheDocument();
  expect(defaultText).toBeInTheDocument();
});

test('navigate on button press', async () => {
  const { 
    getByText, 
    container
  } = render(
    <Router>
      <Switch>
        <LandingPage />
        <Route path='/players'><PlayersList /></Route>
      </Switch>
    </Router>
  )
  const viewPlayerButton = getByText(/View Players/i, { selector: 'span' });

  expect(viewPlayerButton).not.toBeDisabled();

  act(() => {
    fireEvent.click(viewPlayerButton);
  });

  expect(container).toHaveTextContent(/Players/);
})
