import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Products from './Products';

const mockProducts = [
  {
    id: 1,
    name: 'Amazing Grey Box',
    color: 'grey',
    active: true,
    summary: 'A grey box',
    created_by_id: 1,
    user: { name: 'Jon' }
  },
  {
    id: 2,
    name: 'Awesome Purple Plant',
    color: 'purple',
    active: true,
    summary: 'A purple plant',
    created_by_id: 1,
    user: { name: 'Jon' }
  },
]

describe('<Products />', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'));
  afterEach(() => jest.resetAllMocks());

  it('shows a list of products', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
      headers: {
        get: () => jest.fn(),
      }
    });
    const { findByText } = render(<MemoryRouter initialEntries={['/products/1']}>
      <Route path='/products/:pageId'>
        <Products users={[{ id: 1, name: 'Jon' }]} />
      </Route>
    </MemoryRouter>);

    await findByText(/amazing/i);
    await findByText(/awesome/i);
  });

  it('shows No Products text if no products are returned', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
      headers: {
        get: () => 0,
      }
    });
    const { findByText } = render(<MemoryRouter initialEntries={['/products/1']}>
      <Route path='/products/:pageId'>
        <Products users={[{ id: 1, name: 'Jon' }]} />
      </Route>
    </MemoryRouter>);

    await findByText(/no products/i);
  });

  it('shows an error message if an error occurs', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
    });
    const { findByText } = render(<MemoryRouter initialEntries={['/products/1']}>
      <Route path='/products/:pageId'>
        <Products users={[{ id: 1, name: 'Jon' }]} />
      </Route>
    </MemoryRouter>);

    await findByText(/Error retreiving product data!/i);
  })
});