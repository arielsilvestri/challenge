import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import UserProfile from './UserProfile';

describe('<UserProfile />', () => {
  it('shows a user name', async () => {
    const { findByText } = render(<MemoryRouter initialEntries={['/users/1']}>
      <Route path='/users/:userId'>
        <UserProfile users={[{ id: 1, name: 'Jon' }]} />
      </Route>
    </MemoryRouter>);

    await findByText(/jon/i);
  });
});