import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import UserCard from './UserCard';
import { act } from 'react-dom/test-utils';

const GetUserData = (options: Record<string, unknown>) => ({
  id: 'foobar',
  avatar_url: 'https://avatars0.githubusercontent.com/u/23042052',
  html_url: 'https://github.com/alcmoraes',
  name: 'Alexandre',
  location: 'Florianópolis - SC | Brazil',
  ...options,
});

jest.mock('axios');

test('Renders UserCard', async () => {
  const promise = Promise.resolve({ data: GetUserData({ name: 'Rogério' }) });
  (axios.get as jest.Mock).mockImplementationOnce(() => promise);
  render(<UserCard username='' />);
  await act(() => promise);
  expect(screen.queryByText('Rogério')).toHaveClass('MuiTypography-h5');
});
