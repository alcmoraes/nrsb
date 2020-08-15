import React from 'react';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Button, { Sizes } from './Button';

test('Renders Button Component as Big', async () => {
  render(<Button label='Primary' size={Sizes.BIG} />);
  expect(screen.queryByText(/Primary/)).toBeTruthy();
});
