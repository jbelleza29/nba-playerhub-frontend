import React from 'react';
import { render } from '@testing-library/react';

import PlayersList from './PlayersList';


test('initial render', () => {
  const { getByRole } = render(<PlayersList />);
  expect(getByRole('button', {name: /Create Player/i })).toBeInTheDocument();
});

